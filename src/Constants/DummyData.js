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
  categoryName: Strings.garments,
  achieved: targetVsAchievementData[0].achieved,
  remaining: targetVsAchievementData[0].remaining,
  barColor: categoryColorMap.garments,
  fillPaddingLeft: 20,
  fillPaddingRight: 8,
};

export const unstitchedTarget = {
  categoryName: Strings.unstitched,
  achieved: targetVsAchievementData[1].achieved,
  remaining: targetVsAchievementData[1].remaining,
  barColor: categoryColorMap.unstitched,
};

export const accessoriesTarget = {
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
  { value: 8, label: '10:00' },
  { value: 20, label: '' },
  { value: 52, label: '02:00' },
  { value: 88, label: '' },
  { value: 65, label: '06:00' },
  { value: 58, label: '' },
  { value: 70, label: '10:00' },
  { value: 95, label: '' },
  { value: 140, label: '12:00' },
];

export const staffComparisonInvoiceData = [
  { value: 2 },
  { value: 6 },
  { value: 18 },
  { value: 32 },
  { value: 22 },
  { value: 30 },
  { value: 12 },
  { value: 20 },
  { value: 42 },
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
