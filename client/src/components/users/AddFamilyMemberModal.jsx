import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../ui/Modal';
import { addFamilyMember, updateFamilyMember } from '../../redux/slices/userDetailSlice';

const RELATION_OPTIONS = ['Son', 'Daughter', 'Spouse', 'Parent', 'Sibling', 'Other'];

const emptyForm = {
  name: '',
  relation: 'Son',
  phone: '',
  dateOfBirth: '',
  gender: '',
  bloodGroup: '',
};

const AddFamilyMemberModal = ({ isOpen, onClose, userId, existingMember }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(existingMember);

  // pre-fill form if editing, otherwise use empty defaults
  const [form, setForm] = useState(
    isEditing
      ? {
          name: existingMember.name || '',
          relation: existingMember.relation || 'Son',
          phone: existingMember.phone || '',
          dateOfBirth: existingMember.dateOfBirth
            ? existingMember.dateOfBirth.split('T')[0]
            : '',
          gender: existingMember.gender || '',
          bloodGroup: existingMember.bloodGroup || '',
        }
      : emptyForm
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }

    setSubmitting(true);
    try {
      if (isEditing) {
        await dispatch(
          updateFamilyMember({ memberId: existingMember._id, updates: form })
        ).unwrap();
      } else {
        // add userId to the form data before sending to the API
        await dispatch(addFamilyMember({ ...form, userId })).unwrap();
      }
      onClose();
      setForm(emptyForm);
    } catch (err) {
      setError(err || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Family Member' : 'Add Family Member'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* error message */}
        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. John Williams"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 transition-all"
            style={{ '--tw-ring-color': 'var(--jiva-green)' }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Relation</label>
          <select
            name="relation"
            value={form.relation}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none"
          >
            {RELATION_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              placeholder="e.g. O+"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-sm text-white font-semibold rounded-lg transition-colors disabled:opacity-60"
            style={{ backgroundColor: 'var(--jiva-green)' }}
          >
            {submitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFamilyMemberModal;
