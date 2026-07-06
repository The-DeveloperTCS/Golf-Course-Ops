export const DEMO_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    firstName: "Alex",
    lastName: "Morgan",
    emailAddress: "alex.morgan@wavelandgolf.com",
    role: "ROLE_ADMINISTRATOR",
    jobTitle: "Course Administrator",
    phoneNumber: "(515) 555-0101",
    profilePicture: "",
    status: true,
  },
  {
    id: 2,
    username: "manager",
    password: "manager123",
    firstName: "Jordan",
    lastName: "Reed",
    emailAddress: "jordan.reed@wavelandgolf.com",
    role: "ROLE_MANAGER",
    jobTitle: "General Manager",
    phoneNumber: "(515) 555-0102",
    profilePicture: "",
    status: true,
  },
  {
    id: 3,
    username: "staff",
    password: "staff123",
    firstName: "Taylor",
    lastName: "Brooks",
    emailAddress: "taylor.brooks@wavelandgolf.com",
    role: "ROLE_PRO_SHOP_STAFF",
    jobTitle: "Pro Shop Staff",
    phoneNumber: "(515) 555-0103",
    profilePicture: "",
    status: true,
  },
  {
    id: 4,
    username: "starter",
    password: "starter123",
    firstName: "Casey",
    lastName: "Hughes",
    emailAddress: "casey.hughes@wavelandgolf.com",
    role: "ROLE_STARTER",
    jobTitle: "Starter",
    phoneNumber: "(515) 555-0104",
    profilePicture: "",
    status: true,
  },
];

export const findDemoUser = (username, password) =>
  DEMO_USERS.find(
    (user) =>
      user.username.toLowerCase() === username.toLowerCase() &&
      user.password === password
  );
