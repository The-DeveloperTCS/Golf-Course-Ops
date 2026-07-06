import { PERMISSION_RESOURCES } from "./permissions";

const FIRST = [
  "James",
  "Michael",
  "Robert",
  "David",
  "William",
  "Richard",
  "Joseph",
  "Thomas",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Mark",
  "Donald",
  "Steven",
  "Andrew",
  "Paul",
  "Joshua",
  "Kenneth",
  "Kevin",
  "Brian",
  "George",
  "Timothy",
  "Ronald",
  "Edward",
  "Jason",
  "Jeffrey",
  "Ryan",
  "Jacob",
  "Gary",
];

const LAST = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
];

const pick = (list, index) => list[index % list.length];

const statuses = ["Active", "Inactive", "Pending"];

const genEmployees = () =>
  Array.from({ length: 28 }, (_, i) => {
    const firstName = pick(FIRST, i);
    const lastName = pick(LAST, i + 3);
    return {
      id: i + 1,
      firstName,
      lastName,
      gender: i % 2 === 0 ? "Male" : "Female",
      emailAddress: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@wavelandgolf.com`,
      phoneNumber: `(515) 555-${String(1000 + i).slice(-4)}`,
      cellPhoneNumber: `(515) 555-${String(2000 + i).slice(-4)}`,
      username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      dateOfBirth: `198${i % 10}-0${(i % 9) + 1}-15`,
      address: `${120 + i} Fairway Drive`,
      city: "Waveland",
      state: "IA",
      zipCode: "50248",
      jobTitle:
        i === 0
          ? "Administrator"
          : i < 4
          ? "Manager"
          : i < 10
          ? "Pro Shop Staff"
          : "Starter",
      pinNumber: String(1000 + i),
      cardNumber: `EMP-${String(i + 1).padStart(4, "0")}`,
      defaultTerminal: `Terminal ${(i % 3) + 1}`,
      comments: "Seasonal staff member at Waveland Golf Course.",
      role:
        i === 0
          ? "ROLE_ADMINISTRATOR"
          : i < 4
          ? "ROLE_MANAGER"
          : i < 10
          ? "ROLE_PRO_SHOP_STAFF"
          : "ROLE_STARTER",
      isEmailVerified: true,
      status: i % 9 !== 0,
      profilePicture: "",
      hourlyRate: 18 + (i % 12),
    };
  });

const genLocations = () =>
  Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: [
      "Waveland Main Clubhouse",
      "Pro Shop",
      "Cart Barn",
      "Practice Range",
      "Putting Green",
      "Halfway House",
      "Maintenance Yard",
      "Starter Booth",
      "Bag Drop",
      "Member Lounge",
      "Tournament Tent",
      "Driving Range Pavilion",
    ][i],
    address: `${200 + i} Country Club Road`,
    city: "Waveland",
    state: "IA",
    zipCode: "50248",
    phoneNumber: `(515) 555-${String(3000 + i).slice(-4)}`,
    status: i % 5 !== 0 ? "Active" : "Inactive",
    description: "On-course facility for daily golf operations.",
  }));

const genCustomers = () =>
  Array.from({ length: 35 }, (_, i) => {
    const firstName = pick(FIRST, i + 5);
    const lastName = pick(LAST, i + 8);
    return {
      id: i + 1,
      firstName,
      lastName,
      emailAddress: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phoneNumber: `(515) 555-${String(4000 + i).slice(-4)}`,
      address: `${50 + i} Oak Street`,
      city: "Des Moines",
      state: "IA",
      zipCode: "50309",
      membershipType: i % 3 === 0 ? "Member" : i % 3 === 1 ? "Guest" : "League",
      handicap: (i % 18) + 1,
      status: pick(statuses, i),
      dateOfBirth: `197${i % 10}-0${(i % 9) + 1}-20`,
      comments: "Regular weekend player.",
    };
  });

const genGiftCards = (customers) =>
  Array.from({ length: 30 }, (_, i) => {
    const customer = customers[i % customers.length];
    return {
      id: i + 1,
      giftCardNumber: `GC-${String(100000 + i)}`,
      value: [25, 50, 75, 100, 150, 200][i % 6],
      balance: [25, 50, 75, 100, 150, 200][i % 6] - (i % 4) * 5,
      customerId: customer.id,
      customerName: `${customer.firstName} ${customer.lastName}`,
      dateIssued: `2025-0${(i % 9) + 1}-10`,
      expirationDate: `2026-0${(i % 9) + 1}-10`,
      status: i % 7 === 0 ? "Expired" : "Active",
      notes: "Purchased at pro shop.",
    };
  });

const genCategories = () =>
  [
    "Green Fees",
    "Cart Rental",
    "Pro Shop",
    "Food & Beverage",
    "Lessons",
    "Tournaments",
    "Membership",
    "Range Balls",
  ].map((name, i) => ({
    id: i + 1,
    name,
    status: "Active",
    description: `${name} category for POS and inventory.`,
  }));

const genSubCategories = (categories) =>
  categories.flatMap((category, ci) =>
    ["Standard", "Premium", "Junior"].map((suffix, si) => ({
      id: ci * 3 + si + 1,
      name: `${category.name} ${suffix}`,
      fName: category.name,
      categoryId: category.id,
      status: "Active",
    }))
  );

const genInventories = (categories, subCategories) =>
  Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    itemName: [
      "Golf Balls (Dozen)",
      "Golf Glove",
      "Premium Tee Pack",
      "Range Token",
      "Cart Fee - 18 Holes",
      "Green Fee - 9 Holes",
      "Green Fee - 18 Holes",
      "Club Rental Set",
      "Hat - Waveland Logo",
      "Polo Shirt",
    ][i % 10],
    sku: `SKU-${String(5000 + i)}`,
    itemType: i % 2 === 0 ? "Product" : "Service",
    price: 12 + (i % 15) * 3,
    quantity: 20 + (i % 40),
    categoryId: categories[i % categories.length].id,
    subCategory: subCategories[i % subCategories.length].name,
    subCategoryId: subCategories[i % subCategories.length].id,
    supplier: "Waveland Pro Supply",
    status: i % 8 === 0 ? "Inactive" : "Active",
    description: "Stocked inventory item for pro shop sales.",
  }));

const genCarts = () =>
  Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    cartNumber: `CART-${String(i + 1).padStart(3, "0")}`,
    make: i % 2 === 0 ? "Club Car" : "EZ-GO",
    model: i % 2 === 0 ? "Tempo" : "RXV",
    year: 2018 + (i % 6),
    status: i % 6 === 0 ? "Maintenance" : "Available",
    batteryLevel: 60 + (i % 40),
    location: "Cart Barn",
    notes: "Daily fleet cart.",
  }));

const genSuppliers = () =>
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: [
      "Titleist Pro Supply",
      "Callaway Distribution",
      "TaylorMade Wholesale",
      "Waveland Pro Supply",
      "Midwest Golf Goods",
      "Fairway Beverage Co.",
      "GreenMaster Turf",
      "CartParts Direct",
      "Pinnacle Apparel",
      "Sunrise Snacks",
    ][i % 10],
    contactName: `${pick(FIRST, i)} ${pick(LAST, i + 2)}`,
    emailAddress: `orders${i + 1}@supplier.com`,
    phoneNumber: `(800) 555-${String(6000 + i).slice(-4)}`,
    address: `${500 + i} Commerce Blvd`,
    city: "Des Moines",
    state: "IA",
    zipCode: "50312",
    status: "Active",
  }));

const genTerminals = () =>
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Terminal ${i + 1}`,
    location: ["Pro Shop", "Starter Booth", "Halfway House", "Clubhouse"][
      i % 4
    ],
    ipAddress: `192.168.1.${10 + i}`,
    status: i % 5 === 0 ? "Offline" : "Online",
    serialNumber: `TRM-${String(7000 + i)}`,
  }));

const genSeasons = () =>
  ["Spring", "Summer", "Fall", "Winter", "Twilight", "Weekend Prime"].map(
    (name, i) => ({
      id: i + 1,
      name: `${name} Season`,
      startDate: `2025-0${(i % 6) + 1}-01`,
      endDate: `2025-0${(i % 6) + 2}-28`,
      status: "Active",
      season_list: [
        {
          id: i * 2 + 1,
          name: `${name} Weekday`,
          price: 35 + i * 5,
        },
        {
          id: i * 2 + 2,
          name: `${name} Weekend`,
          price: 45 + i * 5,
        },
      ],
    })
  );

const genDepartments = () =>
  [
    "Administration",
    "Pro Shop",
    "Food & Beverage",
    "Maintenance",
    "Starters",
    "Tournaments",
  ].map((name, i) => ({
    id: i + 1,
    name,
    status: "Active",
    description: `${name} department.`,
  }));

const genGroups = () =>
  Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: `League Group ${i + 1}`,
    groupType: i % 2 === 0 ? "League" : "Outing",
    maxPlayers: 4,
    status: "Active",
    contactName: `${pick(FIRST, i)} ${pick(LAST, i)}`,
    phoneNumber: `(515) 555-${String(8000 + i).slice(-4)}`,
  }));

const genRoles = () => [
  {
    id: 1,
    name: "ROLE_ADMINISTRATOR",
    description: "Full system administrator",
    status: "Active",
  },
  {
    id: 2,
    name: "ROLE_MANAGER",
    description: "Course manager",
    status: "Active",
  },
  {
    id: 3,
    name: "ROLE_PRO_SHOP_STAFF",
    description: "Pro shop staff",
    status: "Active",
  },
  {
    id: 4,
    name: "ROLE_STARTER",
    description: "Starter / tee sheet",
    status: "Active",
  },
];

const genPermissions = () =>
  PERMISSION_RESOURCES.map((name, i) => ({
    id: i + 1,
    name,
    description: `Access control for ${name.replace(/_/g, " ").toLowerCase()}`,
    status: "Active",
  }));

const genTeeSheets = (customers) => {
  const slots = [];
  let id = 1;
  const dates = [];
  for (let offset = -7; offset <= 14; offset += 1) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    dates.push(date.toISOString().slice(0, 10));
  }

  dates.forEach((date) => {
    for (let hour = 8; hour < 18; hour += 1) {
      for (const minute of [0, 9, 18, 27, 36, 45, 54]) {
        const start_time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}:00`;
        const customer = customers[id % customers.length];
        if (id % 3 !== 0) {
          slots.push({
            id,
            date,
            start_time,
            end_time: `${String(hour).padStart(2, "0")}:${String(
              minute + 9 > 59 ? minute + 9 - 60 : minute + 9
            ).padStart(2, "0")}:00`,
            customer_name: `${customer.firstName} ${customer.lastName}`,
            customerId: customer.id,
            group_name: "tee-time",
            groupId: (id % 14) + 1,
            holes: id % 2 === 0 ? 18 : 9,
            persons: (id % 4) + 1,
            cart_count: id % 2,
            pay_mode: id % 4 === 0 ? "walk-in" : "reserved",
            comment: "Tee time reservation",
            saleId: id,
            status: "booked",
          });
        }
        id += 1;
      }
    }
  });
  return slots;
};

const genSales = (customers) =>
  Array.from({ length: 40 }, (_, i) => {
    const customer = customers[i % customers.length];
    const subtotal = 35 + (i % 12) * 8;
    const tax = Math.round(subtotal * 0.07);
    return {
      id: i + 1,
      saleID: String(560000 + i),
      price: new Date(2025, i % 12, (i % 28) + 1).toDateString(),
      items: String((i % 4) + 1),
      soldto: `${customer.firstName} ${customer.lastName}`,
      subtotal: `$${subtotal}`,
      total: `$${subtotal + tax}`,
      tax: `$${tax}`,
      paymenttype: i % 3 === 0 ? "cash" : i % 3 === 1 ? "card" : "gift-card",
      payMode: "paid",
      subTotal: subtotal,
      saleTax: tax,
    };
  });

export const buildSeedDatabase = () => {
  const customers = genCustomers();
  const categories = genCategories();
  const subCategories = genSubCategories(categories);

  return {
    employees: genEmployees(),
    locations: genLocations(),
    customers,
    giftCards: genGiftCards(customers),
    categories,
    subCategories,
    inventories: genInventories(categories, subCategories),
    carts: genCarts(),
    suppliers: genSuppliers(),
    terminals: genTerminals(),
    seasons: genSeasons(),
    departments: genDepartments(),
    groups: genGroups(),
    roles: genRoles(),
    permissions: genPermissions(),
    teesheets: genTeeSheets(customers),
    timeClock: [],
    sales: genSales(customers),
    uploadedFiles: {},
    comments: [],
    banners: [
      {
        id: 1,
        title: "Summer League Registration",
        status: "Active",
        imageUrl: "",
        sortOrder: 1,
      },
      {
        id: 2,
        title: "Twilight Rates Now Available",
        status: "Active",
        imageUrl: "",
        sortOrder: 2,
      },
    ],
  };
};
