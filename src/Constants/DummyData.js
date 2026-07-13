import { Images } from '../Assets';
import { Colors } from './Colors';
import { categoryColorMap } from './CategoryColors';
import { Strings } from './Strings';

const promoItem = {
  id: 1,
  category: 'Promotions',
  date: 'Nov 28, 2025',
  title: 'Mega Sale is coming soon',
  description:
    'Get ready for our biggest sale of the year. Prepare your branches and stock for incredible customer turnout.',
};

const performanceItem = {
  id: 2,
  category: 'Performance',
  date: 'Nov 26, 2025',
  title: 'Top Performers of the Week',
  description:
    'Congratulations to our outstanding sales achievers this week. Check the leaderboard to see who made it to the top',
};

const hrItem = {
  id: 3,
  category: 'HR',
  date: 'Nov 24, 2025',
  title: 'Special Incentives & Rewards',
  description:
    'New incentive program launching next month with exclusive rewards, bonuses and recognition for high achievers.',
};

export const announcementData = {
  All: [promoItem, performanceItem, hrItem],
  HR: [hrItem],
  Performance: [performanceItem],
  Promotions: [promoItem],
};

export const surveyData = [
  {
    id: 'price-satisfaction',
    title: 'Price Satisfaction Survey',
    questions: [
      {
        id: 'q1',
        question: 'How do you rate our unstitched pricing?',
        options: ['High', 'Fair', 'Low'],
        required: true,
      },
      {
        id: 'q2',
        question: 'How do you rate our bags pricing?',
        options: ['High', 'Fair', 'Low'],
        required: true,
      },
    ],
  },
];

export const getSurveyById = id =>
  surveyData.find(item => item.id === id) || surveyData[0];

export const targetVsAchievementData = [
  {
    id: '1',
    categoryKey: 'garments',
    achieved: 43,
    remaining: 57,
    colorKey: 'garments',
  },
  {
    id: '2',
    categoryKey: 'unstitched',
    achieved: 67,
    remaining: 33,
    colorKey: 'unstitched',
  },
  {
    id: '3',
    categoryKey: 'accessories',
    achieved: 43,
    remaining: 57,
    colorKey: 'accessories',
  },
];

export const garmentsTarget = {
  id: 'garments',
  categoryName: Strings.garments,
  achieved: targetVsAchievementData[0].achieved,
  remaining: targetVsAchievementData[0].remaining,
  barColor: categoryColorMap.garments,
  fillPaddingLeft: 20,
  fillPaddingRight: 8,
};

export const unstitchedTarget = {
  id: 'unstitched',
  categoryName: Strings.unstitched,
  achieved: targetVsAchievementData[1].achieved,
  remaining: targetVsAchievementData[1].remaining,
  barColor: categoryColorMap.unstitched,
};

export const accessoriesTarget = {
  id: 'accessories',
  categoryName: Strings.accessories,
  achieved: targetVsAchievementData[2].achieved,
  remaining: targetVsAchievementData[2].remaining,
  barColor: categoryColorMap.accessories,
  fillPaddingLeft: 20,
  fillPaddingRight: 8,
};

export const commissionData = {
  target: '35K',
  sale: '21.9K',
  commission: 'Rs. 34K',
  achieved: 61,
  remaining: 39,
};

export const categoryBreakdownData = [
  {
    id: '1',
    categoryName: Strings.garments,
    target: '100',
    achieved: '43',
    commission: 'Rs 250',
    dotColor: categoryColorMap.garments,
  },
  {
    id: '2',
    categoryName: Strings.unstitched,
    target: '100',
    achieved: '67',
    commission: 'Rs 270',
    dotColor: categoryColorMap.unstitched,
  },
  {
    id: '3',
    categoryName: Strings.accessories,
    target: '100',
    achieved: '43',
    commission: 'Rs 230',
    dotColor: categoryColorMap.accessories,
  },
];

export const slipBoundIncentiveData = [
  {
    id: '1',
    dateDay: '14 Apr',
    dateYear: '2026',
    slab: 'A',
    invoice: 'INV-1234',
    salesId: 'SID-5542',
    netSale: '90K',
    incentive: '900',
  },
  {
    id: '2',
    dateDay: '15 Apr',
    dateYear: '2026',
    slab: 'B',
    invoice: 'INV-1235',
    salesId: 'SID-5543',
    netSale: '75K',
    incentive: '750',
  },
  {
    id: '3',
    dateDay: '16 Apr',
    dateYear: '2026',
    slab: 'C',
    invoice: 'INV-1236',
    salesId: 'SID-5544',
    netSale: '120K',
    incentive: '1200',
  },
  {
    id: '4',
    dateDay: '17 Apr',
    dateYear: '2026',
    slab: 'D',
    invoice: 'INV-1237',
    salesId: 'SID-5545',
    netSale: '65K',
    incentive: '650',
  },
  {
    id: '5',
    dateDay: '18 Apr',
    dateYear: '2026',
    slab: 'E',
    invoice: 'INV-1238',
    salesId: 'SID-5546',
    netSale: '88K',
    incentive: '880',
  },
];

export const notificationData = [
  {
    id: 1,
    title: 'New Training Assigned',
    description: 'Customer Service Training is now available.',
    category: 'Training',
    time: '20m ago',
    icon: 'Assignment',
  },
  {
    id: 2,
    title: 'Product Training Updated',
    description: 'New product details added for 2 Piece Jacquard Suit-Dyed.',
    category: 'Training',
    time: '1h ago',
    icon: 'Assignment',
  },
  {
    id: 3,
    title: 'Mega Sale Announcement',
    description: 'A new announcement has been shared by management.',
    category: 'Announcements',
    time: '2h ago',
    icon: 'MegaAssignment',
  },
  {
    id: 4,
    title: 'Feedback Submitted',
    description: 'Your feedback about silk co-ords has been sent successfully.',
    category: 'Feedback',
    time: 'Yesterday',
    icon: 'Feedback',
  },
  {
    id: 5,
    title: 'New Survey Available',
    description: 'Price Satisfaction Survey is ready to submit.',
    category: 'Surveys',
    time: 'Yesterday',
    icon: 'Survey',
  },
  {
    id: 6,
    title: 'Incentive Updated',
    description: 'Your slip-bound incentive has been updated.',
    category: 'Incentives',
    time: 'Sep 13',
    icon: 'Gift',
  },
];

export const staffComparisonRankData = [
  {
    id: '1',
    rank: 1,
    name: 'Zain',
    target: 70,
    achieved: 83,
    commission: 'Rs. 878',
    rankColor: Colors.mintGreen,
  },
  {
    id: '2',
    rank: 2,
    name: 'Saleem',
    target: 70,
    achieved: 94,
    commission: 'Rs. 856',
    rankColor: Colors.brightBlue,
  },
  {
    id: '3',
    rank: 3,
    name: 'Usman',
    target: 60,
    achieved: 42,
    commission: 'Rs. 658',
    rankColor: Colors.vividAmber,
  },
  {
    id: '4',
    rank: 4,
    name: 'Haris',
    target: 60,
    achieved: 58,
    commission: 'Rs. 550',
    rankColor: Colors.mediumGrey,
  },
  {
    id: '5',
    rank: 5,
    name: 'Zain',
    target: 70,
    achieved: 44,
    commission: 'Rs. 459',
    rankColor: Colors.mediumGrey,
  },
  {
    id: '6',
    rank: 6,
    name: 'Saleem',
    target: 70,
    achieved: 33,
    commission: 'Rs. 388',
    rankColor: Colors.mediumGrey,
  },


  {
    id: '7',
    rank: 7,
    name: 'Saleem',
    target: 70,
    achieved: 33,
    commission: 'Rs. 388',
    rankColor: Colors.mediumGrey,
  },
];

export const staffComparisonFootfallData = [
  { value: 1000, label: '10:00' },
  { value: 4000, label: '' },
  { value: 1800, label: '02:00' },
  { value: 2800, label: '' },
  { value: 2000, label: '06:00' },
  { value: 2200, label: '' },
  { value: 1200, label: '10:00' },
  { value: 3000, label: '' },
  { value: 2000, label: '12:00' },
];

export const staffComparisonInvoiceData = [
  { value: 200 },
  { value: 1400 },
  { value: 500 },
  { value: 1000 },
  { value: 1160 },
  { value: 1000 },
  { value: 300 },
  { value: 1100 },
  { value: 900 },
];

export const surveyReportBranchOptions = [
  { label: 'All Branches', value: 'all' },
  { label: 'Limelight Downtown', value: 'downtown' },
  { label: 'Limelight Gulberg', value: 'gulberg' },
  { label: 'DHA', value: 'dha' },
  { label: 'Limelight Johar Town', value: 'johar_town' },
];

export const surveyReportSummary = {
  responses: 6,
  total: 8,
  rate: '75%',
};

export const branchesData = [
  {
    id: 1,
    name: 'MM Alam',
    staff: [
      { id: 1, name: 'Mudassar', garments: 40, unstitched: 20, accessories: 30 },
      { id: 2, name: 'Atique', garments: 10, unstitched: 30, accessories: 0 },
      { id: 3, name: 'Zain', garments: 50, unstitched: 0, accessories: 20 },
      { id: 4, name: 'Komal', garments: 50, unstitched: 0, accessories: 0 },
      { id: 5, name: 'Ayesha', garments: 30, unstitched: 50, accessories: 0 },
      { id: 6, name: 'Azhar', garments: 30, unstitched: 20, accessories: 30 },
      { id: 7, name: 'Rizwan', garments: 20, unstitched: 30, accessories: 20 },
    ],
    totals: { garments: 200, unstitched: 150, accessories: 100 },
  },
  {
    id: 2,
    name: 'DHA',
    staff: [
      { id: 1, name: 'Hassan', garments: 18, unstitched: 14, accessories: 9 },
      { id: 2, name: 'Sara', garments: 22, unstitched: 18, accessories: 11 },
      { id: 3, name: 'Bilal', garments: 24, unstitched: 19, accessories: 12 },
      { id: 4, name: 'Nida', garments: 20, unstitched: 16, accessories: 10 },
      { id: 5, name: 'Usman', garments: 26, unstitched: 21, accessories: 13 },
    ],
    totals: { garments: 110, unstitched: 88, accessories: 55 },
  },
  {
    id: 3,
    name: 'Packages',
    staff: [
      { id: 1, name: 'Ali', garments: 22, unstitched: 17, accessories: 11 },
      { id: 2, name: 'Fatima', garments: 25, unstitched: 19, accessories: 12 },
      { id: 3, name: 'Hamza', garments: 28, unstitched: 21, accessories: 14 },
      { id: 4, name: 'Hina', garments: 24, unstitched: 18, accessories: 12 },
      { id: 5, name: 'Imran', garments: 27, unstitched: 20, accessories: 13 },
      { id: 6, name: 'Sana', garments: 23, unstitched: 17, accessories: 11 },
    ],
    totals: { garments: 149, unstitched: 112, accessories: 73 },
  },
  {
    id: 4,
    name: 'Emporium',
    staff: [
      { id: 1, name: 'Danish', garments: 19, unstitched: 15, accessories: 10 },
      { id: 2, name: 'Maria', garments: 21, unstitched: 16, accessories: 11 },
      { id: 3, name: 'Omar', garments: 23, unstitched: 18, accessories: 12 },
      { id: 4, name: 'Rabia', garments: 20, unstitched: 15, accessories: 10 },
    ],
    totals: { garments: 83, unstitched: 64, accessories: 43 },
  },
];

export const branchStaffComparisonData = [
  {
    id: 1,
    name: 'DHA',
    staff: [
      { id: 1, rank: 1, name: 'Zain', achieved: 80, remaining: 19, commission: 'Rs. 878' },
      { id: 2, rank: 2, name: 'Saleem', achieved: 79, remaining: 21, commission: 'Rs. 856' },
      { id: 3, rank: 3, name: 'Ayesha', achieved: 66, remaining: 34, commission: 'Rs. 658' },
      { id: 4, rank: 4, name: 'Haris', achieved: 61, remaining: 39, commission: 'Rs. 550' },
      { id: 5, rank: 5, name: 'Zain', achieved: 54, remaining: 46, commission: 'Rs. 459' },
      { id: 6, rank: 6, name: 'Saleem', achieved: 51, remaining: 49, commission: 'Rs. 388' },
      { id: 7, rank: 7, name: 'Ayesha', achieved: 47, remaining: 53, commission: 'Rs. 310' },
    ],
  },
  {
    id: 2,
    name: 'MM Alam',
    staff: [
      { id: 1, rank: 1, name: 'Mudassar', achieved: 72, remaining: 28, commission: 'Rs. 710' },
      { id: 2, rank: 2, name: 'Atique', achieved: 65, remaining: 35, commission: 'Rs. 640' },
      { id: 3, rank: 3, name: 'Zain', achieved: 58, remaining: 42, commission: 'Rs. 590' },
      { id: 4, rank: 4, name: 'Komal', achieved: 52, remaining: 48, commission: 'Rs. 520' },
      { id: 5, rank: 5, name: 'Ayesha', achieved: 46, remaining: 54, commission: 'Rs. 460' },
      { id: 6, rank: 6, name: 'Azhar', achieved: 38, remaining: 62, commission: 'Rs. 380' },
      { id: 7, rank: 7, name: 'Rizwan', achieved: 30, remaining: 70, commission: 'Rs. 310' },
    ],
  },
  {
    id: 3,
    name: 'Packages',
    staff: [
      { id: 1, rank: 1, name: 'Ali', achieved: 78, remaining: 22, commission: 'Rs. 800' },
      { id: 2, rank: 2, name: 'Fatima', achieved: 70, remaining: 30, commission: 'Rs. 720' },
      { id: 3, rank: 3, name: 'Hamza', achieved: 63, remaining: 37, commission: 'Rs. 660' },
      { id: 4, rank: 4, name: 'Hina', achieved: 56, remaining: 44, commission: 'Rs. 580' },
      { id: 5, rank: 5, name: 'Imran', achieved: 49, remaining: 51, commission: 'Rs. 500' },
      { id: 6, rank: 6, name: 'Sana', achieved: 42, remaining: 58, commission: 'Rs. 420' },
    ],
  },
  {
    id: 4,
    name: 'Emporium',
    staff: [
      { id: 1, rank: 1, name: 'Danish', achieved: 74, remaining: 26, commission: 'Rs. 750' },
      { id: 2, rank: 2, name: 'Maria', achieved: 66, remaining: 34, commission: 'Rs. 680' },
      { id: 3, rank: 3, name: 'Omar', achieved: 59, remaining: 41, commission: 'Rs. 610' },
      { id: 4, rank: 4, name: 'Rabia', achieved: 51, remaining: 49, commission: 'Rs. 530' },
    ],
  },
];

export const asmConversionData = [
  { rank: 1, name: 'Emporium', traffic: 92, invoices: 10, conv: 15 },
  { rank: 2, name: 'MM Alam', traffic: 90, invoices: 12, conv: 14 },
  { rank: 3, name: 'Dolmen', traffic: 65, invoices: 8, conv: 12 },
  { rank: 4, name: 'Gulberg', traffic: 62, invoices: 11, conv: 11 },
  { rank: 5, name: 'Packages', traffic: 64, invoices: 9, conv: 8 },
  { rank: 6, name: 'Amanah Mall', traffic: 59, invoices: 9, conv: 8 },
  { rank: 7, name: 'Liberty', traffic: 55, invoices: 7, conv: 7 },
  { rank: 8, name: 'Fortress', traffic: 52, invoices: 8, conv: 6 },
  { rank: 9, name: 'Centaurus', traffic: 48, invoices: 6, conv: 6 },
  { rank: 10, name: 'Giga Mall', traffic: 45, invoices: 5, conv: 5 },
];

export const asmYoursAchievementRow = {
  rank: 7,
  name: 'DHA (Yours)',
  achieved: 70,
  remaining: 30,
};

export const regionYoursConversionRow = {
  rank: 1,
  name: 'Lahore (Yours)',
  traffic: 92,
  invoices: 10,
  conv: 15,
};

export const regionConversionData = [
  { rank: 2, name: 'GT Road 1', traffic: 90, invoices: 12, conv: 14 },
  { rank: 3, name: 'ISB/PINDI', traffic: 65, invoices: 8, conv: 12 },
  { rank: 4, name: 'Faisalabad', traffic: 62, invoices: 11, conv: 11 },
  { rank: 5, name: 'Karachi', traffic: 64, invoices: 9, conv: 8 },
  { rank: 6, name: 'South', traffic: 59, invoices: 9, conv: 8 },
  { rank: 7, name: 'North', traffic: 41, invoices: 8, conv: 7 },
  { rank: 8, name: 'Multan', traffic: 55, invoices: 7, conv: 7 },
  { rank: 9, name: 'Hyderabad', traffic: 48, invoices: 6, conv: 6 },
  { rank: 10, name: 'Quetta', traffic: 42, invoices: 5, conv: 5 },
];

export const regionYoursAchievementRow = {
  rank: 7,
  name: 'Lahore (Yours)',
  achieved: 70,
  remaining: 30,
};

export const bmTeamAchievementRow = {
  rank: 1,
  name: 'DHA (Team)',
  achieved: 70,
  remaining: 30,
};

export const branchManagerStaffData = branchStaffComparisonData[0].staff;

const asmAchievementRows = [
  { rank: 1, name: 'Emporium', achieved: 43, remaining: 57 },
  { rank: 2, name: 'MM Alam', achieved: 65, remaining: 35 },
  { rank: 3, name: 'Dolmen', achieved: 80, remaining: 22 },
  { rank: 4, name: 'Gulberg', achieved: 70, remaining: 30 },
  { rank: 5, name: 'Packages', achieved: 63, remaining: 37 },
  { rank: 6, name: 'Amanah Mall', achieved: 56, remaining: 44 },
];

export const asmGarmentsData = asmAchievementRows;
export const asmUnstitchedData = asmAchievementRows;
export const asmAccessoriesData = asmAchievementRows;

const managerBranchTargets = [
  { week: 'Week 1', units: 60, badge: '20%' },
  { week: 'Week 2', units: 75, badge: '25%' },
  { week: 'Week 3', units: 90, badge: '30%' },
  { week: 'Week 4', units: 75, badge: '25%' },
];

const managerWeeklyPerformance = [
  {
    week: 'W1',
    progress: 1,
    percent: 20,
    units: 60,
    status: 'Done',
    statusColor: Colors.branchGreen,
  },
  {
    week: 'W2',
    progress: 0.21,
    percent: 21,
    units: 65,
    status: '10 CF',
    statusColor: Colors.vividAmber,
  },
  {
    week: 'W3',
    progress: 0.2,
    percent: 20,
    units: 60,
    status: Strings.active,
    statusColor: Colors.brightBlue,
  },
  {
    week: 'W4',
    progress: 0,
    percent: 0,
    units: 0,
    status: 'Next',
    statusColor: Colors.black,
  },
];

export const managerPerformanceSummary = {
  branchMonthlyTarget: 1050,
  achieved: 500,
  remaining: 550,
  commission: 500,
  achievedPercent: 52,
  remainingPercent: 50,
};

export const managerGarmentsPerformance = {
  id: 'garments',
  title: Strings.garments,
  target: 260,
  achieved: 160,
  remaining: 100,
  achievementPercent: 61,
  iconSource: Images.Garments,
  iconBg: Colors.darkgreen,
  progressColor: Colors.branchGreen,
  iconTintColor: Colors.branchGreen,
  branchTargets: managerBranchTargets,
  weeklyPerformance: managerWeeklyPerformance,
};

export const managerUnstitchedPerformance = {
  id: 'unstitched',
  title: Strings.unstitched,
  target: 200,
  achieved: 100,
  remaining: 100,
  achievementPercent: 51,
  iconSource: Images.unstiched,
  iconBg: Colors.whiteOrange,
  progressColor: Colors.vividAmber,
  iconTintColor: Colors.vividAmber,
  branchTargets: managerBranchTargets,
  weeklyPerformance: managerWeeklyPerformance,
};

export const managerAccessoriesPerformance = {
  id: 'accessories',
  title: Strings.accessories,
  target: 150,
  achieved: 75,
  remaining: 75,
  achievementPercent: 50,
  iconSource: Images.Accesories,
  iconBg: Colors.lightBlue,
  progressColor: Colors.brightBlue,
  iconTintColor: Colors.brightBlue,
  branchTargets: managerBranchTargets,
  weeklyPerformance: managerWeeklyPerformance,
};

export const surveyReportDetail = {
  reportTitle: 'Price Satisfaction Survey',
  title: 'Monthly Employee Satisfaction Survey',
  questions: 2,
  responseRate: '75%',
  responses: '8 responses',
  breakdown: [
    { label: 'High', value: 25, color: '#2F6FED' },
    { label: 'Fair', value: 60, color: '#2BC48A' },
    { label: 'Low', value: 15, color: '#F4A11A' },
  ],
};

export const trainingTabs = ['Customer', 'Product', 'Display'];

export const trainingStatuses = ['New', 'Pending', 'Completed'];

export const trainingDisplayCategories = [
  'Unstitched',
  'RTW',
  'Co-ords',
  'Western',
];

export const trainingWaveform = [
  0.8, 1.4, 2.2, 1.6, 2.8, 1.2, 2.4, 1.8, 3, 1.5, 2.6, 1, 2, 1.4, 2.8, 1.2,
  2.2, 1.6, 1, 1.8, 1.3, 0.9,
];

export const trainingCustomerData = [
  {
    id: 'c1',
    image: Images.CustomerService,
    title: 'Managing Multiple Customers During Rush Hours',
    description:
      'Learn time management techniques to handle multiple customers during peak store hours without compromising service quality.',
    date: '15 Sep',
  },
  {
    id: 'c2',
    image: Images.GreetingCustomers,
    title: 'Greeting Customers with Confidence & Warmth',
    description:
      'Master the art of first impressions and create welcoming experiences that build customer loyalty from the moment they walk in.',
    date: '19 Sep',
  },
  {
    id: 'c3',
    image: Images.HandlingComplaints,
    title: 'Handling Complaints & Difficult Conversations',
    description:
      'Turn complaints into opportunities by learning empathy-driven communication techniques used by top retail professionals.',
    date: '25 Sep',
  },
];

export const trainingProductData = [
  {
    id: 'p1',
    swatch: '#E6DCC6',
    title: '2 Piece Jacquard Suit Dyed',
    code: 'A1708ST-XSL-143',
    tags: [
      { label: 'Printed' },
      { label: 'Jacquard' },
      { label: 'Winter', accent: true },
    ],
    price: 'Rs. 5,999',
    audio: '2:14',
    detail: {
      color: 'Purple',
      shirt: 'Printed · 2.27m',
      bottom: 'Dyed · 1.8m',
      fabric: 'Cambric',
      detailTags: [
        { label: 'Printed', solid: true },
        { label: 'Jacquard' },
      ],
      highlights: [
        'Lightweight Winter Fabric',
        'Perfect For Daily Wear',
        'Designed For People Aged 22–35',
      ],
      audio: '0:18',
    },
  },
  {
    id: 'p2',
    swatch: '#C0249E',
    title: '2 Piece Jacquard Suit Dyed',
    code: 'A1201SK-XSL-168',
    tags: [
      { label: 'Printed Shirt' },
      { label: 'Cambric' },
      { label: 'Purple', dotColor: '#9333EA' },
    ],
    price: 'Rs. 5,699',
    highlight: 'Lightweight summer fabric, perfect for daily wear',
    audio: '1:48',
    detail: {
      color: 'Purple',
      shirt: 'Printed · 2.27m',
      bottom: 'Dyed · 1.8m',
      fabric: 'Cambric',
      detailTags: [
        { label: 'Printed', solid: true },
        { label: 'Cambric' },
      ],
      highlights: [
        'Lightweight Summer Fabric',
        'Perfect For Daily Wear',
        'Designed For People Aged 22–35',
      ],
      audio: '0:15',
    },
  },
];

export const trainingDisplayData = [
  {
    id: 'd1',
    image: Images.WindowDisplay,
    location: 'Window Section',
    category: 'UNSTITCHED DISPLAY GUIDE',
    title: 'Getting the Window Ready',
    description:
      'Learn how to prepare the display window with proper product placement, spacing, and visual balance.',
    progress: 0,
    duration: '0:00 / 4:12',
  },
  {
    id: 'd2',
    image: Images.VisualMerchandising,
    location: 'Main Floor',
    category: 'VISUAL MERCHANDISING',
    title: 'Unstitched Display Guide',
    description:
      'Learn how to arrange unstitched fabric sections in a clean, attractive, and customer-friendly way.',
    progress: 0,
    duration: '0:00 / 6:04',
  },
];
