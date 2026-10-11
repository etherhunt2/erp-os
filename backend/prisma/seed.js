const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
let bcrypt;
try {
  bcrypt = require("bcrypt");
} catch {
  bcrypt = require("bcryptjs");
}
const fs = require("fs");
const path = require("path");
const saltRounds = 10;

const folderName = "uploads";
const folderPath = path.join(
  __dirname,
  "../routes/inventory/product",
  folderName
);



// Check if the folder already exists
!fs.existsSync(folderPath)
  ? // Create the folder
    fs.mkdirSync(folderPath)
  : console.log(`Folder "${folderPath}" already exists.`);




const endpoints = [
  "paymentPurchaseInvoice",
  "paymentSaleInvoice",
  "returnSaleInvoice",
  "purchaseInvoice",
  "returnPurchaseInvoice",
  "rolePermission",
  "saleInvoice",
  "transaction",
  "permission",
  "dashboard",
  "customer",
  "supplier",
  "product",
  "user",
  "role",
  "designation",
  "productCategory",
  "account",
  "setting",
  "productSubCategory",
  "productBrand",
  "email",
  "adjust",
  "warehouse",
  "stock",
  "attribute",
  "color",
  "meta",
  "transfer",
  "review",
  "slider",
  "shoppingCart",
  "vat"
];

const permissionTypes = ["create", "readAll","readSingle", "update", "delete"];

// create permissions for each endpoint by combining permission type and endpoint name
const permissions = endpoints.reduce((acc, cur) => {
  const permission = permissionTypes.map((type) => {
    return `${type}-${cur}`;
  });
  return [...acc, ...permission];
}, []);

const roles = ["admin", "staff", "e-commerce"];

const account = [
  { name: "Asset", type: "Asset" },
  { name: "Liability", type: "Liability" },
  { name: "Capital", type: "Owner's Equity" },
  { name: "Withdrawal", type: "Owner's Equity" },
  { name: "Revenue", type: "Owner's Equity" },
  { name: "Expense", type: "Owner's Equity" },
  { name: "vat", type: "Govt." },
];

const subAccount = [
  { accountId: 1, name: "Cash" }, //1
  { accountId: 1, name: "Bank" }, //2
  { accountId: 1, name: "Inventory" }, //3
  { accountId: 1, name: "Accounts Receivable" }, //4
  { accountId: 2, name: "Accounts Payable" }, //5
  { accountId: 3, name: "Capital" }, //6
  { accountId: 4, name: "Withdrawal" }, //7
  { accountId: 5, name: "Sales" }, //8
  { accountId: 6, name: "Cost of Sales" }, //9
  { accountId: 6, name: "Salary" }, //10
  { accountId: 6, name: "Rent" }, //11
  { accountId: 6, name: "Utilities" }, //12
  { accountId: 5, name: "Discount Earned" }, //13
  { accountId: 6, name: "Discount Given" }, //14
  { accountId: 7, name: "Tax Received" }, //15
  { accountId: 7, name: "Tax Given" }, //16
];

const settings = {
  companyName: "My Company",
  address: "My Address",
  phone: "My Phone",
  email: "My Email",
  website: "My Website",
  footer: "My Footer",
  tagLine: "My Tag Line",
};

const customerEndpoints = ["product_details", "profile", "purchase"];

// Define a mapping of endpoints to permission types
const endpointPermissionMapping = {
  product_details: ["read"],
  profile: ["read", "update"],
  purchase: ["create", "read", "update"],
};
const customerPermissionsData = [];

for (let endpoint of customerEndpoints) {
  const permissionTypes = endpointPermissionMapping[endpoint];

  for (let permissionType of permissionTypes) {
    const permission = `${permissionType}-${endpoint}`;
    const data = { user: "customer", permissions: permission };
    customerPermissionsData.push(data);
  }
}

//designation
const designation = [
  { name: "Manager" },
  { name: "employee" },
  { name: "Salesman" },
  { name: "Accountant" },
  { name: "Storekeeper" },
  { name: "Driver" },
  { name: "Cleaner" },
];

//category
const category = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Grocery" },
  { name: "Furniture" },
  { name: "Stationary" },
  { name: "Sports" },
  { name: "Books" },
  { name: "Toys" },
  { name: "Others" },
];

//subCategory
const subCategory = [
  { name: "Mobile", productCategoryId: 1 },
  { name: "Laptop", productCategoryId: 1 },
  { name: "Television", productCategoryId: 1 },
  { name: "Camera", productCategoryId: 1 },
  { name: "Headphone", productCategoryId: 1 },
  { name: "Shirt", productCategoryId: 2 },
  { name: "Pant", productCategoryId: 2 },
  { name: "T-Shirt", productCategoryId: 2 },
  { name: "Jeans", productCategoryId: 2 },
  { name: "Shoes", productCategoryId: 2 },
  { name: "Rice", productCategoryId: 3 },
  { name: "Oil", productCategoryId: 3 },
  { name: "Spices", productCategoryId: 3 },
  { name: "Vegetables", productCategoryId: 3 },
  { name: "Fruits", productCategoryId: 3 },
  { name: "Bed", productCategoryId: 4 },
  { name: "Sofa", productCategoryId: 4 },
  { name: "Table", productCategoryId: 4 },
  { name: "Chair", productCategoryId: 4 },
  { name: "Almirah", productCategoryId: 4 },
  { name: "Pen", productCategoryId: 5 },
  { name: "Pencil", productCategoryId: 5 },
  { name: "Notebook", productCategoryId: 5 },
  { name: "Paper", productCategoryId: 5 },
  { name: "Eraser", productCategoryId: 5 },
  { name: "Bat", productCategoryId: 6 },
  { name: "Ball", productCategoryId: 6 },
  { name: "Football", productCategoryId: 6 },
  ];

//brand
const brand = [
  { name: "Samsung" },
  { name: "Apple" },
  { name: "Huawei" },
  { name: "Xiaomi" },
  { name: "Oppo" },
  { name: "Dell" },
  { name: "HP" },
  { name: "Lenovo" },
  { name: "Asus" },
  { name: "Sony" },
  { name: "LG" },
  { name: "Panasonic" },
  { name: "Philips" },
  { name: "Hitachi" },
  { name: "Toshiba" },
  { name: "Sharp" },
  ];

//color
const color = [
  { name: "Red", colorCode: "#FF0000" },
  { name: "Green", colorCode: "#008000" },
  { name: "Blue", colorCode: "#0000FF" },
  { name: "Yellow", colorCode: "#FFFF00" },
  { name: "Black", colorCode: "#000000" },
  { name: "White", colorCode: "#FFFFFF" },
  { name: "Orange", colorCode: "#FFA500" },
  { name: "Purple", colorCode: "#800080" },
  { name: "Pink", colorCode: "#FFC0CB" },
  { name: "Brown", colorCode: "#A52A2A" },
  { name: "Grey", colorCode: "#808080" },
  { name: "Gold", colorCode: "#FFD700" },
  { name: "Silver", colorCode: "#C0C0C0" },
  { name: "Cyan", colorCode: "#00FFFF" },
  { name: "Magenta", colorCode: "#FF00FF" },
  { name: "Lime", colorCode: "#00FF00" },
  { name: "Teal", colorCode: "#008080" },
  { name: "Maroon", colorCode: "#800000" },
  { name: "Navy", colorCode: "#000080" },
  { name: "Olive", colorCode: "#808000" },
  ];
//product
const product = [
  {
    name: "Samsung Galaxy S21 Ultra 5G",
    thumbnailImage:"https://www.gizmochina.com/wp-content/uploads/2021/01/Samsung-Galaxy-S21-Ultra-5G-1.jpg",
    productSubCategoryId: 1,
    productBrandId: 1,
    description: "Samsung Galaxy S21 Ultra 5G",
    sku: "Samsung Galaxy S21 Ultra 5G",
    productQuantity: 10,
    productSalePrice: 1000,
    productPurchasePrice: 900,
    unitType: "Piece",
    unitMeasurement: 1,
    reorderQuantity: 5,
    productVat: 10,
  },
  {
    name: "apple iphone 12 pro max",
    thumbnailImage:"https://www.gizmochina.com/wp-content/uploads/2021/apple-iphone-12-pro-max-1.jpg",
    productSubCategoryId: 1,
    productBrandId: 2,
    description: "apple iphone 12 pro max",
    sku: "apple iphone 12 pro max",
    productQuantity: 10,
    productSalePrice: 1000,
    productPurchasePrice: 900,
    unitType: "Piece",
    unitMeasurement: 1,
    reorderQuantity: 5,
    productVat: 10,
  },
  ];

//product color
const productColor = [
  { productId: 1, colorId: 1 },
  { productId: 1, colorId: 2 },
  { productId: 1, colorId: 3 },
  { productId: 1, colorId: 4 },
  { productId: 1, colorId: 5 },
  { productId: 2, colorId: 1 },
  { productId: 2, colorId: 2 },
  { productId: 2, colorId: 3 },
  { productId: 2, colorId: 4 },
  { productId: 2, colorId: 5 },
  ];

const supplier = [
  {
    name: "Samsung",
    phone: "0518162516",
    address: "Dhaka",
  },
  {
    name: "Apple",
    phone: "0181625126",
    address: "Dhaka",
  },
  {
    name: "Xiaomi",
    phone: "0181625163",
    address: "Dhaka",
  }
  ];

const productVat = [
  {
    title:"standard",
    percentage: 15,
  },
  {
    title:"import and supply",
    percentage: 15,
  }
];
async function main() {
  const adminHash = await bcrypt.hash("admin", saltRounds);
  const staffHash = await bcrypt.hash("staff", saltRounds);
  const eCommerceHash = await bcrypt.hash("e-commerce", saltRounds);

  await prisma.customerPermissions.createMany({
    data: customerPermissionsData,
    skipDuplicates: true,
  });

  await prisma.permission.createMany({
    data: permissions.map((permission) => {
      return {
        name: permission,
      };
    }),
    skipDuplicates: true,
  });

  await prisma.role.createMany({
    data: roles.map((role) => {
      return {
        name: role,
      };
    }),
    skipDuplicates: true,
  });

  const allPermissions = await prisma.permission.findMany();
  const adminRole = await prisma.role.findFirst({ where: { id: 1 } }) || await prisma.role.findFirst({ where: { name: "admin" } });
  if (adminRole) {
    for (const perm of allPermissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  await prisma.designation.createMany({
    data: designation,
    skipDuplicates: true,
  });

  await prisma.user.upsert({
    where: { username: "admin" },
    update: { password: adminHash, roleId: 1 },
    create: {
      username: "admin",
      password: adminHash,
      roleId: 1,
    },
  });

  await prisma.user.upsert({
    where: { username: "staff" },
    update: { password: staffHash, roleId: 2 },
    create: {
      username: "staff",
      password: staffHash,
      roleId: 2,
    },
  });

  await prisma.user.upsert({
    where: { username: "e-commerce" },
    update: { password: eCommerceHash, roleId: 3 },
    create: {
      username: "e-commerce",
      password: eCommerceHash,
      roleId: 3,
    },
  });

  await prisma.account.createMany({
    data: account,
    skipDuplicates: true,
  });
  await prisma.subAccount.createMany({
    data: subAccount,
    skipDuplicates: true,
  });
  await prisma.productCategory.createMany({
    data: category,
    skipDuplicates: true,
  });
  await prisma.productSubCategory.createMany({
    data: subCategory,
    skipDuplicates: true,
  });
  await prisma.productBrand.createMany({
    data: brand,
    skipDuplicates: true,
  });
  await prisma.colors.createMany({
    data: color,
    skipDuplicates: true,
  });
  await prisma.product.createMany({
    data: product,
    skipDuplicates: true,
  });
  await prisma.productColor.createMany({
    data: productColor,
    skipDuplicates: true,
  });

  await prisma.supplier.createMany({
    data: supplier,
    skipDuplicates: true,
  });
  await prisma.productVat.createMany({
    data: productVat,
    skipDuplicates: true,
  });

  const existingSetting = await prisma.appSetting.findFirst();
  if (!existingSetting) {
    await prisma.appSetting.create({
      data: settings,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
