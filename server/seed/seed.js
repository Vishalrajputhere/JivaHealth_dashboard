/**
 * seed.js — Jiva Health Database Seeder
 *
 * Run this script once to populate MongoDB with realistic demo data
 * that matches exactly what is shown in the UI mockups.
 *
 * Usage:
 *   node seed/seed.js
 *
 * This will DROP existing data and insert fresh records every time it runs.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the server's .env file
dotenv.config({ path: require('path').join(__dirname, '../.env') });

// Import all models
const User = require('../models/User');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const FamilyMember = require('../models/FamilyMember');

// ── Seed Data ─────────────────────────────────────────────────────────────────

const usersData = [
  {
    name: 'Alice Williams',
    email: 'alice.williams@email.com',
    phone: '+91 98765 43210',
    role: 'Patient',
    userType: 'Normal User',
    isPrime: false,
    status: 'Active',
    lastActive: new Date('2026-04-02'),
    dateOfBirth: new Date('1990-05-15'),
    gender: 'Female',
    bloodGroup: 'O+',
    appointmentCount: 5,
    lastAppointmentDate: new Date('2026-04-01'),
    addresses: [
      {
        label: 'Home',
        street: 'Flat 301, Sunshine Apartments, MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        isDefault: true,
      },
      {
        label: 'Work',
        street: 'Office 12, Tech Park, Andheri East',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400069',
        country: 'India',
        isDefault: false,
      },
    ],
    createdAt: new Date('2025-01-15'),
  },
  {
    name: 'Eva Lopez',
    email: 'eva.lopez@email.com',
    phone: '+1 (555) 555-5555',
    role: 'Patient',
    userType: 'Normal User',
    isPrime: false,
    status: 'Active',
    lastActive: new Date('2026-03-21'),
    dateOfBirth: new Date('1988-07-22'),
    gender: 'Female',
    bloodGroup: 'A+',
    appointmentCount: 8,
    lastAppointmentDate: new Date('2026-03-21'),
    addresses: [
      {
        label: 'Home',
        street: '42 Maple Street',
        city: 'Austin',
        state: 'Texas',
        postalCode: '78701',
        country: 'USA',
        isDefault: true,
      },
    ],
    createdAt: new Date('2025-07-18'),
  },
  {
    name: 'Cecilia Smith',
    email: 'cecilia.smith@email.com',
    phone: '+1 (555) 333-3333',
    role: 'Patient',
    userType: 'Normal User',
    isPrime: false,
    status: 'Inactive',
    lastActive: new Date('2025-12-30'),
    dateOfBirth: new Date('1992-03-10'),
    gender: 'Female',
    bloodGroup: 'B+',
    appointmentCount: 5,
    lastAppointmentDate: new Date('2025-12-30'),
    addresses: [
      {
        label: 'Home',
        street: '88 Oak Avenue',
        city: 'Seattle',
        state: 'Washington',
        postalCode: '98101',
        country: 'USA',
        isDefault: true,
      },
    ],
    createdAt: new Date('2024-05-22'),
  },
  {
    name: 'David Kim',
    email: 'david.kim@hospital.org',
    phone: '+1 (555) 444-4444',
    role: 'Nurse',
    userType: 'Normal User',
    isPrime: false,
    status: 'Active',
    lastActive: new Date('2026-03-22'),
    dateOfBirth: new Date('1985-11-05'),
    gender: 'Male',
    bloodGroup: 'AB+',
    appointmentCount: 30,
    lastAppointmentDate: new Date('2026-03-22'),
    addresses: [
      {
        label: 'Home',
        street: '11 Birch Lane',
        city: 'Chicago',
        state: 'Illinois',
        postalCode: '60601',
        country: 'USA',
        isDefault: true,
      },
    ],
    createdAt: new Date('2022-11-03'),
  },
  {
    name: 'Rajesh Patel',
    email: 'rajesh.patel@clinic.in',
    phone: '+91 99887 76655',
    role: 'Doctor',
    userType: 'Prime User',
    isPrime: true,
    status: 'Active',
    lastActive: new Date('2026-05-20'),
    dateOfBirth: new Date('1978-02-14'),
    gender: 'Male',
    bloodGroup: 'O-',
    appointmentCount: 120,
    lastAppointmentDate: new Date('2026-05-20'),
    addresses: [
      {
        label: 'Clinic',
        street: 'Suite 5, Health Tower, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400050',
        country: 'India',
        isDefault: true,
      },
    ],
    createdAt: new Date('2021-06-01'),
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 77665 54433',
    role: 'Patient',
    userType: 'Prime User',
    isPrime: true,
    status: 'Active',
    lastActive: new Date('2026-04-15'),
    dateOfBirth: new Date('1995-09-28'),
    gender: 'Female',
    bloodGroup: 'A-',
    appointmentCount: 12,
    lastAppointmentDate: new Date('2026-04-15'),
    addresses: [
      {
        label: 'Home',
        street: 'Flat 7B, Green Valley, Koramangala',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560034',
        country: 'India',
        isDefault: true,
      },
    ],
    createdAt: new Date('2023-03-10'),
  },
];

// Orders for Alice Williams (will be linked by userId after insert)
const getOrdersData = (aliceId) => [
  {
    userId: aliceId,
    orderNumber: 1,
    items: [{ name: 'Paracetamol 500mg - 30 tablets', quantity: 1, unitPrice: 250 }],
    total: 250,
    status: 'Delivered',
    statusNote: 'Order delivered successfully',
    orderedAt: new Date('2026-03-28'),
  },
  {
    userId: aliceId,
    orderNumber: 2,
    items: [{ name: 'Paracetamol 500mg - 30 capsules', quantity: 1, unitPrice: 250 }],
    total: 250,
    status: 'Delivered',
    statusNote: 'Order delivered',
    orderedAt: new Date('2026-03-28'),
  },
  {
    userId: aliceId,
    orderNumber: 3,
    items: [{ name: 'Vitamin D3 60K IU - 4 capsules', quantity: 2, unitPrice: 180 }],
    total: 360,
    status: 'Pending',
    statusNote: 'Awaiting dispatch',
    orderedAt: new Date('2026-04-10'),
  },
  {
    userId: aliceId,
    orderNumber: 4,
    items: [
      { name: 'Azithromycin 500mg - 3 tablets', quantity: 1, unitPrice: 120 },
      { name: 'Pantoprazole 40mg - 10 tablets', quantity: 1, unitPrice: 90 },
    ],
    total: 210,
    status: 'Delivered',
    statusNote: 'Delivered to home address',
    orderedAt: new Date('2026-02-15'),
  },
  {
    userId: aliceId,
    orderNumber: 5,
    items: [{ name: 'Cetirizine 10mg - 20 tablets', quantity: 1, unitPrice: 75 }],
    total: 75,
    status: 'Cancelled',
    statusNote: 'Cancelled by user',
    orderedAt: new Date('2026-01-20'),
  },
  {
    userId: aliceId,
    orderNumber: 6,
    items: [{ name: 'Omega 3 Fish Oil - 60 capsules', quantity: 1, unitPrice: 450 }],
    total: 450,
    status: 'Processing',
    statusNote: 'Being packed',
    orderedAt: new Date('2026-05-01'),
  },
];

// Payments for Alice Williams
const getPaymentsData = (aliceId) => [
  {
    userId: aliceId,
    type: 'Consultation Fee',
    description: 'Dr. Rajesh Patel - General Consultation',
    amount: 150,
    method: 'UPI',
    status: 'Completed',
    paidAt: new Date('2026-03-28'),
  },
  {
    userId: aliceId,
    type: 'Lab Test',
    description: 'Complete Blood Count (CBC) - SRL Diagnostics',
    amount: 80,
    method: 'Card',
    status: 'Completed',
    paidAt: new Date('2026-03-28'),
  },
  {
    userId: aliceId,
    type: 'Medicine Order',
    description: 'Paracetamol 500mg - 30 tablets',
    amount: 250,
    method: 'UPI',
    status: 'Completed',
    paidAt: new Date('2026-03-28'),
  },
  {
    userId: aliceId,
    type: 'Consultation Fee',
    description: 'Dr. Meena Joshi - Dermatology Consultation',
    amount: 500,
    method: 'Net Banking',
    status: 'Completed',
    paidAt: new Date('2026-02-10'),
  },
  {
    userId: aliceId,
    type: 'Lab Test',
    description: 'Thyroid Function Test (TFT)',
    amount: 350,
    method: 'UPI',
    status: 'Completed',
    paidAt: new Date('2026-01-15'),
  },
];

// Family members for Alice Williams
const getFamilyMembersData = (aliceId) => [
  {
    userId: aliceId,
    name: 'John Williams',
    relation: 'Spouse',
    phone: '+1 (555) 111-1112',
    dateOfBirth: new Date('1988-03-20'),
    gender: 'Male',
    bloodGroup: 'B+',
  },
  {
    userId: aliceId,
    name: 'Emma Williams',
    relation: 'Daughter',
    phone: '+1 (555) 222-3334',
    dateOfBirth: new Date('2015-06-12'),
    gender: 'Female',
    bloodGroup: 'A+',
  },
  {
    userId: aliceId,
    name: 'Robert Williams',
    relation: 'Son',
    phone: '+1 (555) 333-4445',
    dateOfBirth: new Date('2018-09-05'),
    gender: 'Male',
    bloodGroup: 'O+',
  },
];

// ── Seeder Function ───────────────────────────────────────────────────────────
const seedDatabase = async () => {
  try {
    //to connect the database - my system have to convert the address to ipv4
    const dns = require("node:dns");
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
    dns.setDefaultResultOrder("ipv4first");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Drop all existing collections so we always start fresh
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany();
    await Order.deleteMany();
    await Payment.deleteMany();
    await FamilyMember.deleteMany();

    // Insert users (without timestamps override — let createdAt from usersData be used)
    console.log('👤 Seeding users...');
    // We use insertMany with timestamps disabled so we can manually set createdAt
    const insertedUsers = await User.insertMany(usersData, { timestamps: false });

    // Find Alice to link her related data
    const alice = insertedUsers.find((u) => u.name === 'Alice Williams');
    console.log(`   Inserted ${insertedUsers.length} users`);

    // Insert orders for Alice
    console.log('🛒 Seeding orders...');
    const ordersData = getOrdersData(alice._id);
    await Order.insertMany(ordersData);
    console.log(`   Inserted ${ordersData.length} orders`);

    // Insert payments for Alice
    console.log('💳 Seeding payments...');
    const paymentsData = getPaymentsData(alice._id);
    await Payment.insertMany(paymentsData);
    console.log(`   Inserted ${paymentsData.length} payments`);

    // Insert family members for Alice
    console.log('👨‍👩‍👧‍👦 Seeding family members...');
    const familyData = getFamilyMembersData(alice._id);
    await FamilyMember.insertMany(familyData);
    console.log(`   Inserted ${familyData.length} family members`);

    console.log('\n🌱 Database seeded successfully!');
    console.log('   Users: Eva Lopez, Cecilia Smith, David Kim, Rajesh Patel, Priya Sharma, Alice Williams');
    console.log('   Alice Williams has full orders, payments, and family member data.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder error:', error.message);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
