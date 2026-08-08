import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedTags: { name: string; category: string }[] = [
  // Lifecycle
  ...['Requirements', 'CONOPS', 'Functional Analysis', 'Architecture', 'Allocation', 'Interface Definition', 'Design', 'Implementation', 'Integration', 'Verification', 'Validation', 'Ground Testing', 'Flight Testing', 'Deployment', 'Operations', 'Maintenance'].map((n) => ({ name: n, category: 'Lifecycle' })),
  // TechnicalDomain
  ...['Aircraft Systems', 'Systems Engineering', 'Avionics', 'Electrical Systems', 'Flight Controls', 'Embedded Systems', 'Software', 'Autonomy', 'Robotics', 'Communications', 'Sensors', 'Payloads', 'Ground Control Systems', 'Propulsion', 'Aerodynamics', 'Structures', 'Flight Test', 'Safety', 'Certification', 'Operations', 'Research', 'Simulation', 'Data Processing'].map((n) => ({ name: n, category: 'TechnicalDomain' })),
  // SkillTool
  ...['Python', 'C', 'C++', 'Embedded C', 'MATLAB', 'ROS', 'HIL', 'CAN', 'Ethernet', 'RS-232', 'RS-422', 'UART', 'MBSE', 'Simulink', 'Raspberry Pi', 'Arduino', 'ANSYS', 'OpenFOAM', 'XFLR5', 'CATIA', 'SolidWorks', 'Autodesk Inventor', 'QGIS', 'Git'].map((n) => ({ name: n, category: 'SkillTool' })),
];

async function main() {
  console.log('Seeding tags...');
  for (const t of seedTags) {
    await prisma.tag.upsert({
      where: { name_category: { name: t.name, category: t.category } },
      update: {},
      create: t,
    });
  }
  console.log(`Seeded ${seedTags.length} tags.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
