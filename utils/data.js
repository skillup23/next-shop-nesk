import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Robert",
      email: "are@ya.ru",
      password: bcrypt.hashSync("12345678"),
      isAdmin: true,
    },
    {
      name: "Miron",
      email: "miron@ya.ru",
      password: bcrypt.hashSync("12345678"),
      isAdmin: false,
    },
  ],

  //      Информация по товарам
  // name: имя товара
  // slug: путь страницы товара в браузере
  // article: артикл
  // category: категория
  // image: "путь к изображению
  // price: цена
  // brand: бренд
  // power: "мощность
  // cableLength: Длина зарядного кабеля
  // connector: Разъём
  // countInStock: количество товара на складе, при 0 - измениться описаните на карточке товара
  // descriotion: описание товара
  products: [
    {
      name: "Orbis VIARIS UNI 22кВт T2",
      slug: "Orbis-VIARIS-UNI-22",
      article: "CH000001",
      category: "Зарядная станция",
      image: "/images/charging-station-1.png",
      price: 70,
      brand: "Orbis",
      power: "22 кВт",
      cableLength: "0",
      connector: "Type 2",
      countInStock: 20,
      description:
        "Viaris Uni 230V однофазная 7,4 кВт с кабелем T2 5 м – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "Orbis VIARIS UNI 22кВт Т2 5м",
      slug: "5m-Orbis-VIARIS-UNI-22-5m",
      article: "CH000002",
      category: "Зарядная станция",
      image: "/images/charging-station-2.png",
      price: 120000,
      brand: "Orbis",
      power: "22 кВт",
      cableLength: "5",
      connector: "Type 2",
      countInStock: 20,
      description:
        "Viaris Uni 230V однофазная 7,4 кВт с кабелем T2 5 м – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "E-PROM 22кВт",
      slug: "22-E-PROM-22",
      article: "CH000003",
      category: "Зарядная станция",
      image: "/images/charging-station-3.png",
      price: 150000,
      brand: "E-PROM",
      power: "22 кВт",
      cableLength: "5",
      connector: "Type 2",
      countInStock: 40,
      description:
        "Viaris Uni 230V однофазная 7,4 кВт с кабелем T2 5 м – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "E-PROM 7кВт",
      slug: "7-E-PROM-7",
      article: "CH000004",
      category: "Зарядная станция",
      image: "/images/charging-station-4.png",
      price: 145000,
      brand: "E-PROM",
      power: "7 кВт",
      cableLength: "5",
      connector: "Type 1",
      countInStock: 90,
      description:
        "Viaris Uni 230V однофазная 7,4 кВт с кабелем T2 5 м – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "Orbis VIARIS UNI T1 22кВт 5м",
      slug: "Orbis-VIARIS-UNI-T1-22-5m",
      article: "CH000006",
      category: "Зарядная станция",
      image: "/images/charging-station-6.png",
      price: 125000,
      brand: "Orbis",
      power: "22 кВт",
      cableLength: "5",
      connector: "Type 1",
      countInStock: 90,
      description:
        "Viaris Uni 230V однофазная 7,4 кВт с кабелем T2 5 м – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "Orbis VIARIS UNI 22кВт T1",
      slug: "Orbis-VIARIS-UNI-T1-22",
      article: "CH000005",
      category: "Зарядная станция",
      image: "/images/charging-station-5.png",
      price: 110000,
      brand: "Orbis",
      power: "22 кВт",
      cableLength: "0",
      connector: "Type 1",
      countInStock: 80,
      description:
        "Viaris Uni 230V однофазная 7,4 кВт с кабелем T2 5 м – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
  ],
};

export default data;
