export type EducationBoard = 'CBSE' | 'ICSE' | 'Cambridge / IB' | 'State Board';

export interface BookItem {
  id: string;
  subject: string;
  title: string;
  publisher: string;
  isbn: string;
  price: number;
  required: boolean;
  edition: string;
}

export interface NotebookItem {
  id: string;
  title: string;
  specification: string;
  quantity: number;
  price: number;
  required: boolean;
}

export interface StationeryItem {
  id: string;
  title: string;
  description: string;
  price: number;
  optional: boolean;
  selectedByDefault: boolean;
}

export interface GradeBooklist {
  grade: string;
  board: EducationBoard;
  totalPrice: number;
  bundlePrice: number;
  textbooks: BookItem[];
  notebooks: NotebookItem[];
  stationery: StationeryItem[];
}

export interface School {
  id: string;
  code: string;
  name: string;
  city: string;
  board: EducationBoard;
  verified: boolean;
  academicYear: string;
  classes: string[];
  studentStrength: number;
  campusAddress: string;
  deliveryEstimate: string;
  featured?: boolean;
  booklists: Record<string, GradeBooklist>;
}

export interface CartItem {
  id: string;
  schoolId: string;
  schoolName: string;
  schoolCode: string;
  grade: string;
  studentName: string;
  studentRoll?: string;
  selectedBooks: BookItem[];
  selectedNotebooks: NotebookItem[];
  selectedStationery: StationeryItem[];
  totalPrice: number;
}

export type OrderMilestone = 'placed' | 'preparing' | 'ready' | 'dispatched' | 'delivered';

export interface OrderTimelineItem {
  status: OrderMilestone;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

export interface OrderTrackingInfo {
  orderId: string;
  customerName: string;
  customerPhone: string;
  schoolName: string;
  schoolCode: string;
  grade: string;
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: OrderMilestone;
  statusDescription: string;
  carrier: string;
  trackingNumber: string;
  shippingAddress: string;
  packageDetails: {
    weightKg: string;
    totalBooks: number;
    totalNotebooks: number;
    tamperProofSealId: string;
  };
  totalAmount: number;
  timeline: OrderTimelineItem[];
}

export interface DemoRequest {
  institutionName: string;
  contactName: string;
  role: 'Principal' | 'Administrator' | 'Distributor' | 'Publisher';
  email: string;
  phone: string;
  city: string;
  studentStrength: string;
  board: EducationBoard;
  message?: string;
}
