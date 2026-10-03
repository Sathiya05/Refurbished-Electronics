/* =============================================================
   ReTech — data.js
   Shared catalogue, taxonomy and formatting helpers.
   Classic script (no build step) exposed as window.ReTech.
   All product content below is demonstration data.
   ============================================================= */
(function (global) {
  'use strict';

  var IMG = 'assets/images/';

  /* ---------------------------------------------------------
     Demo product catalogue
     --------------------------------------------------------- */
  var products = [
    {
      id: 1,
      brand: 'Dell',
      name: 'Latitude 5420',
      category: 'Laptops',
      price: 31999,
      originalPrice: 49999,
      discount: 36,
      condition: 'Excellent',
      warranty: '6 Months',
      rating: 4.7,
      reviews: 84,
      image: IMG + 'img-latitude-5420.jpg',
      backImage: IMG + 'img-latitude-5420-back.jpg',
      stock: 12,
      featured: true,
      addedOn: '2026-09-02',
      storage: '512 GB SSD',
      ram: '16 GB',
      description:
        'A dependable business laptop rebuilt around a 12th-gen Intel Core i5, a crisp 14-inch Full HD panel and a fresh SSD. Ideal for office work, remote classes and long study sessions.',
      specifications: {
        Processor: '12th Gen Intel Core i5-1245U',
        RAM: '16 GB DDR4',
        Storage: '512 GB NVMe SSD',
        Display: '14" Full HD (1920 x 1080) IPS',
        Battery: 'Replaced 4-cell battery, up to 8h typical use',
        Connectivity: '2x USB-A, USB-C Thunderbolt 4, HDMI 2.1, 3.5mm jack, Wi-Fi 6, Bluetooth 5.2',
        Weight: '1.38 kg',
        Inclusions: 'Charger, documentation'
      }
    },
    {
      id: 2,
      brand: 'Apple',
      name: 'MacBook Air M1',
      category: 'Laptops',
      price: 49999,
      originalPrice: 69999,
      discount: 29,
      condition: 'Excellent',
      warranty: '6 Months',
      rating: 4.8,
      reviews: 126,
      image: IMG + 'img-macbook-air-m1.jpg',
      backImage: IMG + 'img-macbook-air-m1-back.jpg',
      stock: 7,
      featured: true,
      addedOn: '2026-08-24',
      storage: '256 GB SSD',
      ram: '8 GB',
      description:
        'Fanless Apple Silicon performance with an all-day battery, a colour-accurate Liquid Retina display and a keyboard that has been fully cleaned and re-seated during refurbishment.',
      specifications: {
        Processor: 'Apple M1 (8-core CPU / 8-core GPU)',
        RAM: '8 GB unified memory',
        Storage: '256 GB SSD',
        Display: '13.3" Liquid Retina, 500 nits',
        Battery: '49.2Wh, up to 18h video playback',
        Connectivity: '2x Thunderbolt 3, 3.5mm jack, Wi-Fi 6, Bluetooth 5.0',
        Weight: '1.29 kg',
        Inclusions: '30W USB-C charger'
      }
    },
    {
      id: 3,
      brand: 'Lenovo',
      name: 'ThinkPad E14',
      category: 'Laptops',
      price: 27999,
      originalPrice: 42999,
      discount: 35,
      condition: 'Very Good',
      warranty: '6 Months',
      rating: 4.5,
      reviews: 61,
      image: IMG + 'img-thinkpad-e14.jpg',
      backImage: IMG + 'img-thinkpad-e14-back.jpg',
      stock: 18,
      featured: false,
      addedOn: '2026-09-11',
      storage: '512 GB SSD',
      ram: '8 GB',
      description:
        'A sturdy ThinkPad with a tested keyboard, security fingerprint reader and a refreshed battery pack. Light cosmetic marks are part of the selected Very Good grade.',
      specifications: {
        Processor: 'AMD Ryzen 5 5625U',
        RAM: '8 GB DDR4',
        Storage: '512 GB NVMe SSD',
        Display: '14" Full HD IPS, 300 nits',
        Battery: 'Tested 45Wh pack, health checked',
        Connectivity: '2x USB-A, USB-C, HDMI 2.0, RJ45, 3.5mm jack, Wi-Fi 6',
        Weight: '1.64 kg',
        Inclusions: 'Charger'
      }
    },
    {
      id: 4,
      brand: 'HP',
      name: 'EliteBook 840 G7',
      category: 'Laptops',
      price: 24999,
      originalPrice: 38999,
      discount: 36,
      condition: 'Good',
      warranty: '3 Months',
      rating: 4.3,
      reviews: 47,
      image: IMG + 'img-elitebook-840.jpg',
      backImage: IMG + 'img-elitebook-840-back.jpg',
      stock: 9,
      featured: false,
      addedOn: '2026-07-30',
      storage: '256 GB SSD',
      ram: '8 GB',
      description:
        'A secure, business-grade notebook with a fingerprint reader, Windows Hello camera and a solid aluminium chassis. Graded Good, meaning visible everyday wear on the lid and palm rest.',
      specifications: {
        Processor: 'Intel Core i5-10210U',
        RAM: '8 GB DDR4',
        Storage: '256 GB NVMe SSD',
        Display: '14" Full HD IPS, 250 nits',
        Battery: 'Tested pack, health checked',
        Connectivity: '2x USB-A, USB-C, Thunderbolt 3, HDMI 1.4, 3.5mm jack, Wi-Fi 6',
        Weight: '1.34 kg',
        Inclusions: 'Charger'
      }
    },
    {
      id: 5,
      brand: 'Apple',
      name: 'MacBook Pro 14',
      category: 'Laptops',
      price: 94999,
      originalPrice: 129999,
      discount: 27,
      condition: 'Very Good',
      warranty: '6 Months',
      rating: 4.9,
      reviews: 38,
      image: IMG + 'img-macbook-pro-14.jpg',
      backImage: IMG + 'img-macbook-pro-14-back.jpg',
      stock: 5,
      featured: true,
      addedOn: '2026-09-18',
      storage: '512 GB SSD',
      ram: '16 GB',
      description:
        'A mini-LED creative workstation for editing, design and heavy multi-tasking. Fully functional with a tested keyboard, cleaned ports and verified display output.',
      specifications: {
        Processor: 'Apple M1 Pro (10-core CPU / 16-core GPU)',
        RAM: '16 GB unified memory',
        Storage: '512 GB SSD',
        Display: '14.2" mini-LED Liquid Retina XDR',
        Battery: 'Tested 70Wh pack, up to 16h use',
        Connectivity: '3x Thunderbolt 4, HDMI, SDXC, 3.5mm jack, Wi-Fi 6',
        Weight: '1.61 kg',
        Inclusions: '96W USB-C charger'
      }
    },
    {
      id: 6,
      brand: 'Apple',
      name: 'iPhone 13',
      category: 'Phones',
      price: 34999,
      originalPrice: 59999,
      discount: 42,
      condition: 'Excellent',
      warranty: '6 Months',
      rating: 4.8,
      reviews: 214,
      image: IMG + 'img-iphone-13.jpg',
      backImage: IMG + 'img-iphone-13-back.jpg',
      stock: 15,
      featured: true,
      addedOn: '2026-09-20',
      storage: '128 GB',
      ram: '4 GB',
      description:
        'A dual-camera iPhone with a replaced battery, a tested OLED panel and a data wipe that is completed before dispatch. Cosmetic grade is documented in the listing photos.',
      specifications: {
        Processor: 'Apple A15 Bionic',
        RAM: '4 GB',
        Storage: '128 GB',
        Display: '6.1" Super Retina XDR OLED, 120Hz',
        Battery: 'Replaced battery, health verified above 90%',
        Connectivity: '5G, Wi-Fi 6, Bluetooth 5.0, NFC, Lightning',
        Camera: '12MP dual camera system',
        Inclusions: 'USB-C cable, documentation'
      }
    },
    {
      id: 7,
      brand: 'Samsung',
      name: 'Galaxy S22',
      category: 'Phones',
      price: 28999,
      originalPrice: 42999,
      discount: 33,
      condition: 'Very Good',
      warranty: '6 Months',
      rating: 4.6,
      reviews: 152,
      image: IMG + 'img-galaxy-s22.jpg',
      backImage: IMG + 'img-galaxy-s22-back.jpg',
      stock: 11,
      featured: true,
      addedOn: '2026-09-05',
      storage: '256 GB',
      ram: '8 GB',
      description:
        'A compact flagship with a tested 120Hz AMOLED display, triple rear camera and a clean One UI install after a factory reset.',
      specifications: {
        Processor: 'Snapdragon 8 Gen 1',
        RAM: '8 GB',
        Storage: '256 GB',
        Display: '6.2" Dynamic AMOLED 2X, 120Hz',
        Battery: 'Tested 3700mAh pack, health checked',
        Connectivity: '5G, Wi-Fi 6, Bluetooth 5.2, NFC, USB-C',
        Camera: '12MP + 12MP + 10MP triple camera',
        Inclusions: '25W charger, documentation'
      }
    },
    {
      id: 8,
      brand: 'Google',
      name: 'Pixel 7',
      category: 'Phones',
      price: 21999,
      originalPrice: 34999,
      discount: 37,
      condition: 'Excellent',
      warranty: '6 Months',
      rating: 4.7,
      reviews: 98,
      image: IMG + 'img-pixel-7.jpg',
      backImage: IMG + 'img-pixel-7-back.jpg',
      stock: 13,
      featured: false,
      addedOn: '2026-08-29',
      storage: '128 GB',
      ram: '8 GB',
      description:
        'Stock Android with a verified fingerprint reader, clean camera glass and a tested Tensor G2 chipset that still handles demanding apps without throttling.',
      specifications: {
        Processor: 'Google Tensor G2',
        RAM: '8 GB',
        Storage: '128 GB',
        Display: '6.3" OLED, 90Hz',
        Battery: 'Tested 4355mAh pack, health checked',
        Connectivity: '5G, Wi-Fi 6E, Bluetooth 5.2, NFC, USB-C',
        Camera: '50MP + 12MP dual camera',
        Inclusions: 'USB-C cable'
      }
    },
    {
      id: 9,
      brand: 'OnePlus',
      name: 'OnePlus 11R',
      category: 'Phones',
      price: 18999,
      originalPrice: 29999,
      discount: 37,
      condition: 'Good',
      warranty: '3 Months',
      rating: 4.4,
      reviews: 73,
      image: IMG + 'img-oneplus-11r.jpg',
      backImage: IMG + 'img-oneplus-11r-back.jpg',
      stock: 16,
      featured: false,
      addedOn: '2026-07-18',
      storage: '128 GB',
      ram: '8 GB',
      description:
        'Fast-charging mid-range performance with a smooth 120Hz AMOLED screen. Graded Good, so expect light scuffing on the frame and back glass.',
      specifications: {
        Processor: 'Snapdragon 8+ Gen 1',
        RAM: '8 GB',
        Storage: '128 GB',
        Display: '6.7" AMOLED, 120Hz',
        Battery: 'Tested 5000mAh pack, 100W charging',
        Connectivity: '5G, Wi-Fi 6, Bluetooth 5.3, NFC, USB-C',
        Camera: '50MP + 8MP + 2MP triple camera',
        Inclusions: '100W charger'
      }
    },
    {
      id: 10,
      brand: 'Apple',
      name: 'iPhone 12',
      category: 'Phones',
      price: 24999,
      originalPrice: 39999,
      discount: 37,
      condition: 'Very Good',
      warranty: '6 Months',
      rating: 4.6,
      reviews: 176,
      image: IMG + 'img-iphone-12.jpg',
      backImage: IMG + 'img-iphone-12-back.jpg',
      stock: 14,
      featured: false,
      addedOn: '2026-08-14',
      storage: '64 GB',
      ram: '4 GB',
      description:
        'A well-used daily driver with a tested OLED panel, new battery and a fully tested camera system. Minor marks are shown and described before purchase.',
      specifications: {
        Processor: 'Apple A14 Bionic',
        RAM: '4 GB',
        Storage: '64 GB',
        Display: '6.1" Super Retina OLED',
        Battery: 'Replaced battery, health verified',
        Connectivity: '5G, Wi-Fi 6, Bluetooth 5.0, NFC, Lightning',
        Camera: '12MP dual camera system',
        Inclusions: 'USB-C cable'
      }
    },
    {
      id: 11,
      brand: 'Apple',
      name: 'iPad 10th Gen',
      category: 'Tablets',
      price: 29999,
      originalPrice: 42999,
      discount: 30,
      condition: 'Excellent',
      warranty: '6 Months',
      rating: 4.7,
      reviews: 88,
      image: IMG + 'img-ipad-10.jpg',
      backImage: IMG + 'img-ipad-10-back.jpg',
      stock: 10,
      featured: true,
      addedOn: '2026-09-08',
      storage: '64 GB',
      ram: '4 GB',
      description:
        'A bright 10.9-inch tablet with a laminated glass front, tested USB-C port and a freshly reset iPadOS install. Suits study notes, streaming and light creative work.',
      specifications: {
        Processor: 'Apple A14 Bionic',
        RAM: '4 GB',
        Storage: '64 GB',
        Display: '10.9" Liquid Retina IPS',
        Battery: 'Tested pack, up to 10h use',
        Connectivity: 'Wi-Fi 6, USB-C, Smart Connector, Bluetooth 5.0',
        Weight: '0.49 kg',
        Inclusions: '20W USB-C charger'
      }
    },
    {
      id: 12,
      brand: 'Samsung',
      name: 'Galaxy Tab S8',
      category: 'Tablets',
      price: 34999,
      originalPrice: 54999,
      discount: 36,
      condition: 'Very Good',
      warranty: '6 Months',
      rating: 4.6,
      reviews: 57,
      image: IMG + 'img-tab-s8.jpg',
      backImage: IMG + 'img-tab-s8-back.jpg',
      stock: 6,
      featured: false,
      addedOn: '2026-08-21',
      storage: '128 GB',
      ram: '4 GB',
      description:
        'A slim S-series tablet with a tested S Pen digitiser, dual speakers and an S AMOLED panel with light, documented surface wear.',
      specifications: {
        Processor: 'Snapdragon 8 Gen 1',
        RAM: '4 GB',
        Storage: '128 GB microSD slot',
        Display: '11" Super AMOLED, 120Hz',
        Battery: 'Tested 7040mAh pack',
        Connectivity: 'Wi-Fi 6, USB-C, Bluetooth 5.2, optional 5G',
        Weight: '0.49 kg',
        Inclusions: 'S Pen, 45W charger'
      }
    },
    {
      id: 13,
      brand: 'Lenovo',
      name: 'Tab P11',
      category: 'Tablets',
      price: 13999,
      originalPrice: 19999,
      discount: 30,
      condition: 'Good',
      warranty: '3 Months',
      rating: 4.2,
      reviews: 64,
      image: IMG + 'img-tab-p11.jpg',
      backImage: IMG + 'img-tab-p11-back.jpg',
      stock: 21,
      featured: false,
      addedOn: '2026-07-09',
      storage: '128 GB',
      ram: '4 GB',
      description:
        'A value 11-inch Android tablet for reading, video calls and online classes, with a tested touchscreen and a factory reset applied before dispatch.',
      specifications: {
        Processor: 'MediaTek Kompanio 130',
        RAM: '4 GB',
        Storage: '128 GB microSD slot',
        Display: '11" IPS, 2000 x 1200',
        Battery: 'Tested 7700mAh pack',
        Connectivity: 'Wi-Fi 5, Bluetooth 5.0, USB-C',
        Weight: '0.54 kg',
        Inclusions: '20W charger'
      }
    },
    {
      id: 14,
      brand: 'Apple',
      name: 'AirPods Pro 2',
      category: 'Accessories',
      price: 9999,
      originalPrice: 14999,
      discount: 33,
      condition: 'Excellent',
      warranty: '6 Months',
      rating: 4.7,
      reviews: 132,
      image: IMG + 'img-airpods-pro-2.jpg',
      backImage: '',
      stock: 26,
      featured: true,
      addedOn: '2026-09-15',
      storage: 'N/A',
      ram: 'N/A',
      description:
        'Noise-cancelling earbuds with sanitised silicone tips, a tested charging case and new ear-tip sizing. Battery health of both buds and case is documented.',
      specifications: {
        Processor: 'Apple H2 chip',
        RAM: 'N/A',
        Storage: 'Charging case (battery tested)',
        Display: 'N/A',
        Battery: 'Both buds and case tested',
        Connectivity: 'Bluetooth 5.3, USB-C charging case',
        Weight: '56 g with case',
        Inclusions: 'Charging case, cable, documentation'
      }
    },
    {
      id: 15,
      brand: 'boAt',
      name: 'Airdopes 141',
      category: 'Accessories',
      price: 999,
      originalPrice: 1999,
      discount: 50,
      condition: 'Very Good',
      warranty: '3 Months',
      rating: 4.1,
      reviews: 245,
      image: IMG + 'img-airdopes-141.jpg',
      backImage: '',
      stock: 34,
      featured: false,
      addedOn: '2026-08-06',
      storage: 'N/A',
      ram: 'N/A',
      description:
        'True wireless earbuds cleaned, paired and function-tested. Cosmetically Good with light case wear; sound output and microphone verified.',
      specifications: {
        Processor: 'Bluetooth chipset',
        RAM: 'N/A',
        Storage: 'Charging case',
        Display: 'N/A',
        Battery: 'Buds and case tested on charge cycle',
        Connectivity: 'Bluetooth 5.3',
        Weight: '38 g with case',
        Inclusions: 'Charging case, ear tips'
      }
    },
    {
      id: 16,
      brand: 'Samsung',
      name: 'Galaxy Watch 4',
      category: 'Accessories',
      price: 6999,
      originalPrice: 11999,
      discount: 42,
      condition: 'Good',
      warranty: '3 Months',
      rating: 4.3,
      reviews: 55,
      image: IMG + 'img-galaxy-watch-4.jpg',
      backImage: '',
      stock: 19,
      featured: false,
      addedOn: '2026-07-25',
      storage: '16 GB',
      ram: 'N/A',
      description:
        'A round smartwatch with a replaced strap, tested sensors and a clean watchOS install. Graded Good, so bezel marks may be visible.',
      specifications: {
        Processor: 'Exynos W920',
        RAM: '1.5 GB',
        Storage: '16 GB',
        Display: '0.87" Super AMOLED round',
        Battery: 'Tested 445mAh pack',
        Connectivity: 'Bluetooth 5.0, Wi-Fi, GPS',
        Water: 'Water resistant to 50m (tested seals)',
        Inclusions: 'Replacement strap, charging puck'
      }
    },
    {
      id: 17,
      brand: 'Anker',
      name: '65W GaN Charger',
      category: 'Accessories',
      price: 1799,
      originalPrice: 2999,
      discount: 40,
      condition: 'Excellent',
      warranty: '6 Months',
      rating: 4.6,
      reviews: 189,
      image: IMG + 'img-anker-65w.jpg',
      backImage: '',
      stock: 41,
      featured: false,
      addedOn: '2026-09-19',
      storage: 'N/A',
      ram: 'N/A',
      description:
        'A compact multi-port GaN adapter with tested USB-C and USB-A outputs, cleaned contacts and a load-tested cable set for laptop and phone charging.',
      specifications: {
        Processor: 'GaN power stage',
        RAM: 'N/A',
        Storage: 'N/A',
        Display: 'N/A',
        Battery: 'N/A',
        Connectivity: '1x USB-C PD, 3x USB-A, 65W total output',
        Weight: '210 g',
        Inclusions: 'USB-C to USB-C cable'
      }
    }
  ];

  /* ---------------------------------------------------------
     Categories, grades, FAQs and store details
     --------------------------------------------------------- */
  var categories = [
    {
      name: 'Laptops',
      slug: 'laptops',
      image: IMG + 'cat-laptops.jpg',
      description: 'Reliable refurbished laptops for work, study and everyday use.'
    },
    {
      name: 'Phones',
      slug: 'phones',
      image: IMG + 'cat-phones.jpg',
      description: 'Quality-checked smartphones at affordable prices.'
    },
    {
      name: 'Tablets',
      slug: 'tablets',
      image: IMG + 'cat-tablets.jpg',
      description: 'Refurbished tablets for entertainment, learning and productivity.'
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      image: IMG + 'cat-accessories.jpg',
      description: 'Earbuds, watches and chargers that passed a full function check.'
    }
  ];

  var conditionGrades = [
    {
      name: 'Excellent',
      summary: 'Minimal signs of use, clean and presentable.',
      points: ['No visible screen marks', 'Light wear on edges only', 'Battery health verified', 'Fully function tested']
    },
    {
      name: 'Very Good',
      summary: 'A few light marks, no functional impact.',
      points: ['Faint marks on lid or back', 'No dents or cracks', 'Battery health verified', 'Fully function tested']
    },
    {
      name: 'Good',
      summary: 'Visible everyday wear, working as intended.',
      points: ['Visible scuffs on body', 'Screen free of cracks', 'Battery health checked', 'All ports and buttons tested']
    },
    {
      name: 'Fair',
      summary: 'Heavy cosmetic wear, still fully functional.',
      points: ['Scratches and dents visible', 'May include replaced parts', 'Battery replacement common', 'Function tested and graded']
    }
  ];

  var faqs = [
    {
      q: 'What does refurbished mean?',
      a: 'A refurbished device has been previously owned, inspected, tested and graded by our team. It is sold with the condition grade, included accessories and warranty duration listed on the product page. "Refurbished" does not mean new — the selected grade tells you exactly what to expect cosmetically.'
    },
    {
      q: 'How are devices tested?',
      a: 'Every device goes through a checklist covering display, battery health, keyboard, ports, cameras, speakers, connectivity, storage and charging. Devices that fail any check are sent for further work or recycled instead of being sold.'
    },
    {
      q: 'What condition grades do you offer?',
      a: 'We use four grades: Excellent, Very Good, Good and Fair. Each product page states the grade of the exact unit being sold, so you can compare like for like.'
    },
    {
      q: 'Does every product come with a warranty?',
      a: 'Warranty duration is listed per product because it varies by device and grade — you will see the period (for example 3 or 6 months) on each product page. The warranty covers functional faults identified after delivery and does not cover physical or liquid damage.'
    },
    {
      q: 'Can I return a refurbished product?',
      a: 'Our demo policy allows a 30-day return window on eligible devices provided the device is returned in the same condition with the accessories supplied. Final terms are confirmed by the business before launch.'
    },
    {
      q: 'How can I sell my old device?',
      a: 'Use the Sell Your Device page. You tell us the device type, brand, model and condition, submit your contact details and receive an estimated value. The estimate is indicative only and becomes a firm offer after physical inspection.'
    },
    {
      q: 'Do you erase personal data from devices?',
      a: 'Yes. Every device is factory reset and data wiped as part of the refurbishment process before it is graded or dispatched, so previous owners do not need to hand over devices with personal data still on them.'
    }
  ];

  var store = {
    name: 'ReTech',
    tagline: 'Better Tech. Less Waste.',
    email: 'hello@retech.example',
    phone: '+91 90000 00000',
    hours: 'Monday to Saturday, 10:00 – 19:00 IST',
    location: 'Demo address — replace with your registered business location',
    currency: '₹'
  };

  /* Demonstration impact figures — not audited business data. */
  var demoStats = [
    { label: 'Devices given a second life', value: 1250, suffix: '+', note: 'Demonstration figure' },
    { label: 'Estimated e-waste diverted', value: 2.8, suffix: ' Tons', note: 'Demonstration figure' },
    { label: 'Customers helped', value: 900, suffix: '+', note: 'Demonstration figure' }
  ];

  /* ---------------------------------------------------------
     Filters available on the products page
     --------------------------------------------------------- */
  var filterOptions = {
    brands: ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Google', 'OnePlus', 'boAt', 'Anker'],
    conditions: ['Excellent', 'Very Good', 'Good'],
    storage: ['64 GB', '128 GB', '256 GB', '512 GB SSD', 'N/A'],
    ram: ['4 GB', '8 GB', '16 GB', 'N/A'],
    warranty: ['3 Months', '6 Months'],
    priceRanges: [
      { label: 'Under ₹2,000', min: 0, max: 1999 },
      { label: '₹2,000 – ₹15,000', min: 2000, max: 15000 },
      { label: '₹15,000 – ₹35,000', min: 15001, max: 35000 },
      { label: '₹35,000 – ₹60,000', min: 35001, max: 60000 },
      { label: 'Above ₹60,000', min: 60001, max: Infinity }
    ]
  };

  /* ---------------------------------------------------------
     Trade-in estimate demo table (illustrative only)
     --------------------------------------------------------- */
  var tradeInBase = {
    Phone: { Apple: 34000, Samsung: 24000, Google: 17000, OnePlus: 14000, Dell: 9000, HP: 8000, Lenovo: 8000, Other: 6000 },
    Laptop: { Apple: 62000, Lenovo: 28000, Dell: 26000, HP: 23000, Samsung: 22000, Google: 20000, OnePlus: 18000, Other: 12000 },
    Tablet: { Apple: 26000, Samsung: 20000, Lenovo: 9000, Google: 12000, OnePlus: 10000, Dell: 9000, HP: 9000, Other: 6000 }
  };

  var tradeInConditionFactor = {
    Excellent: 0.52,
    'Very Good': 0.44,
    Good: 0.35,
    Fair: 0.24,
    Damaged: 0.14
  };

  var tradeInBrands = {
    Phone: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Other'],
    Laptop: ['Apple', 'Dell', 'HP', 'Lenovo', 'Other'],
    Tablet: ['Apple', 'Samsung', 'Lenovo', 'Other']
  };

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */
  function formatPrice(value) {
    var n = Number(value) || 0;
    return '₹' + n.toLocaleString('en-IN');
  }

  function formatRating(value) {
    return Number(value).toFixed(1);
  }

  function starsFromRating(rating) {
    var full = Math.round(Number(rating) || 0);
    var out = '';
    for (var i = 1; i <= 5; i++) {
      out += i <= full ? '★' : '☆';
    }
    return out;
  }

  function discountPercent(price, originalPrice) {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  }

  function getProductById(id) {
    var wanted = String(id);
    for (var i = 0; i < products.length; i++) {
      if (String(products[i].id) === wanted) return products[i];
    }
    return null;
  }

  function getBrands() {
    var seen = {};
    return products.reduce(function (acc, p) {
      if (!seen[p.brand]) {
        seen[p.brand] = true;
        acc.push(p.brand);
      }
      return acc;
    }, []);
  }

  function searchProducts(query) {
    var q = String(query || '').trim().toLowerCase();
    if (!q) return [];
    return products.filter(function (p) {
      return (
        p.name.toLowerCase().indexOf(q) > -1 ||
        p.brand.toLowerCase().indexOf(q) > -1 ||
        p.category.toLowerCase().indexOf(q) > -1 ||
        p.condition.toLowerCase().indexOf(q) > -1
      );
    });
  }

  /* Indicative trade-in estimate. Returns a demo mid value and range. */
  function estimateTradeIn(details) {
    var type = details.deviceType || 'Phone';
    var brand = details.brand || 'Other';
    var condition = details.condition || 'Good';
    var base = (tradeInBase[type] || tradeInBase.Phone)[brand] || 6000;
    var factor = tradeInConditionFactor[condition] || 0.3;
    var storageBoost = /256|512/.test(details.storage || '') ? 1.15 : 1;
    var ramBoost = /16/.test(details.ram || '') ? 1.06 : 1;
    var mid = Math.round((base * factor * storageBoost * ramBoost) / 100) * 100;
    return {
      low: Math.round((mid * 0.85) / 100) * 100,
      high: Math.round((mid * 1.15) / 100) * 100,
      mid: mid
    };
  }

  global.ReTech = {
    products: products,
    categories: categories,
    conditionGrades: conditionGrades,
    faqs: faqs,
    store: store,
    demoStats: demoStats,
    filterOptions: filterOptions,
    tradeInBrands: tradeInBrands,
    formatPrice: formatPrice,
    formatRating: formatRating,
    starsFromRating: starsFromRating,
    discountPercent: discountPercent,
    getProductById: getProductById,
    getBrands: getBrands,
    searchProducts: searchProducts,
    estimateTradeIn: estimateTradeIn
  };
})(window);