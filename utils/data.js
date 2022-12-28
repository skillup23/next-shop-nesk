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

const data = {
  products: [
    {
      name: "Orbis VIARIS UNI 22кВт T2",
      slug: "Orbis-VIARIS-UNI-22",
      article: "CH000001",
      category: "Зарядная станция",
      image: "/images/charging-station-1.png",
      price: 115000,
      brand: "Orbis",
      power: "22 кВт",
      cableLength: "отсутствует",
      connector: "Type 2",
      countInStock: 10,
      descriotion:
        "Viaris Uni трехфазная 22 кВт с розеткой T2 с затвором – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "Orbis VIARIS UNI 22кВт Т2 5м",
      slug: "Orbis-VIARIS-UNI-22-5m",
      article: "CH000002",
      category: "Зарядная станция",
      image: "/images/charging-station-2.png",
      price: 120000,
      brand: "Orbis",
      power: "22 кВт",
      cableLength: "5",
      connector: "Type 2",
      countInStock: 20,
      descriotion:
        "Viaris Uni трехфазная 22 кВт с кабелем T2 5м – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "E-PROM 22кВт (напольная)",
      slug: "E-PROM-22",
      article: "CH000003",
      category: "Зарядная станция",
      image: "/images/charging-station-3.png",
      price: 150000,
      brand: "E-PROM",
      power: "22 кВт",
      cableLength: "5",
      connector: "Type 2",
      countInStock: 5,
      descriotion: "Напольное исполнение (со стойкой высотой 1500мм)",
    },
    {
      name: "E-PROM 7кВт (напольная)",
      slug: "E-PROM-7",
      article: "CH000004",
      category: "Зарядная станция",
      image: "/images/charging-station-4.png",
      price: 150000,
      brand: "E-PROM",
      power: "7 кВт",
      cableLength: "5",
      connector: "Type 1",
      countInStock: 10,
      descriotion: "Напольное исполнение (со стойкой высотой 1500мм)",
    },
    {
      name: "Orbis VIARIS UNI 22кВт T1",
      slug: "Orbis-VIARIS-UNI-22-T1",
      article: "CH000005",
      category: "Зарядная станция",
      image: "/images/charging-station-1.png",
      price: 110000,
      brand: "Orbis",
      power: "22 кВт",
      cableLength: "отсутствует",
      connector: "Type 1",
      countInStock: 1,
      descriotion:
        "Viaris Uni трехфазная 22 кВт с розеткой T1 с затвором – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "Orbis VIARIS UNI 22кВт T1 5м",
      slug: "Orbis-VIARIS-UNI-22-5m-T1",
      article: "CH000006",
      category: "Зарядная станция",
      image: "/images/charging-station-2.png",
      price: 125000,
      brand: "Orbis",
      power: "22 кВт",
      cableLength: "5",
      connector: "Type 1",
      countInStock: 10,
      descriotion:
        "Viaris Uni трехфазная 22 кВт с кабелем T1 5м – компактное зарядное устройство для личного и коммерческого использования. Активируйте станцию касанием и управляйте зарядкой через смартфон.",
    },
    {
      name: "test1",
      slug: "test1",
      article: "CH000007",
      category: "test",
      image: "/images/charging-station-2.png",
      price: 1000,
      brand: "Test",
      power: "0 кВт",
      cableLength: "10",
      connector: "Type 3",
      countInStock: 10,
      descriotion: "Тестовый товар",
    },
  ],
};

export default data;
