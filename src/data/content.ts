import {
  Plane,
  Palmtree,
  Hotel,
  Compass,
  Users,
  Briefcase,
  FileText,
  FileCheck,
  Car,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Map,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export const visaNote =
  "Assistance with tourist and business visa application documentation and travel-related requirements, subject to destination-specific rules and service availability. Visa applications are subject to the requirements and decisions of the relevant authorities; Fly Maverick does not influence or guarantee outcomes.";

export type Service = { icon: LucideIcon; title: string; description: string };

export const services: Service[] = [
  { icon: Plane, title: "International Flight Ticket Booking", description: "Flight options for one-way, round-trip and multi-city journeys, with personal booking help." },
  { icon: Palmtree, title: "International Holiday Packages", description: "Holidays built around your destination, travel dates, interests and budget." },
  { icon: Hotel, title: "Hotel Reservations", description: "Help choosing and reserving hotels, resorts and villas abroad." },
  { icon: Compass, title: "Customized International Travel Planning", description: "Tailor-made routes for multi-city trips, honeymoons and special occasions." },
  { icon: Users, title: "Family and Group Travel Arrangements", description: "Coordinated travel for families, friends and groups travelling together." },
  { icon: Briefcase, title: "Business Travel Planning", description: "Flights, hotels and itineraries for business travellers and companies." },
  { icon: FileText, title: "Tourist Visa Application Assistance", description: "Supporting help with tourist visa documentation as part of your trip planning." },
  { icon: FileCheck, title: "Business Visa Application Assistance", description: "Supporting help with business visa documentation for work-related travel." },
  { icon: Car, title: "Airport Transfers and Ground Transportation", description: "Transfer arrangements where available, subject to destination and service availability." },
];

export const whyChoose: Service[] = [
  { icon: HeartHandshake, title: "Personalized travel assistance", description: "A real person who listens to your plans and builds options around you." },
  { icon: Plane, title: "International flight booking support", description: "Help comparing routes, timings and cabin classes for your journey." },
  { icon: Map, title: "Customized holiday planning", description: "Holidays shaped by your interests, pace and budget — not a fixed template." },
  { icon: ShieldCheck, title: "Help with travel arrangements", description: "Hotels, transfers and travel details coordinated in one place." },
  { icon: MessageCircle, title: "Clear communication", description: "Straightforward options and honest answers at every step." },
  { icon: Headphones, title: "Support throughout booking", description: "Guidance from your first enquiry until your travel plans are confirmed." },
];

export const steps = [
  { title: "Share Your Travel Plans", description: "Tell us where, when and how you'd like to travel through a quick enquiry or WhatsApp." },
  { title: "Receive Suitable Options", description: "Our team responds with flight or holiday options matched to your requirements." },
  { title: "Confirm Your Arrangements", description: "Choose your preferred option. Reservations are confirmed only after booking and payment are complete." },
  { title: "Get Ready for Your Journey", description: "Receive your travel documents and pack your bags — your adventure awaits." },
];

export const faqs = [
  {
    q: "How can I enquire about international flight tickets?",
    a: "Fill in the flight enquiry form on our Flight Booking page or the homepage, or message us on WhatsApp. Share your route, dates, number of travellers and cabin class, and our team will reply with suitable flight options.",
  },
  {
    q: "Can I request a customized holiday package?",
    a: "Yes. Every holiday we plan can be tailored to your destinations, travel dates, interests and budget. Use the Request a Quote button on any package or destination page to get started.",
  },
  {
    q: "Does Fly Maverick assist with hotel reservations?",
    a: "Yes. We help with hotel, resort and villa reservations, either on their own or as part of a flight or holiday plan.",
  },
  {
    q: "Can I request a multi-city international itinerary?",
    a: "Yes. Choose the multi-city option in the flight enquiry form and describe your planned stops in the additional requirements field.",
  },
  {
    q: "Does Fly Maverick help with tourist visa applications?",
    a: "We offer tourist and business visa application assistance as a supporting travel service — helping with documentation and travel-related requirements, subject to destination-specific rules and service availability. Visa decisions are made solely by the relevant authorities.",
  },
  {
    q: "Does Fly Maverick provide work visa or recruitment services?",
    a: "No. Fly Maverick does not offer work visa processing, employment visa consultancy, immigration consultancy, recruitment, job placement or manpower services. We are an international travel and ticketing company.",
  },
  {
    q: "How can I request a corporate travel quotation?",
    a: "Use the corporate enquiry form on our Business Travel page with your company details, routes, dates and number of travellers, and our team will get back to you.",
  },
  {
    q: "How do I contact Fly Maverick?",
    a: "Send an enquiry through our Contact page, use any enquiry form on the website, or tap the WhatsApp button on any page.",
  },
  {
    q: "When is my flight reservation confirmed?",
    a: "Submitting an enquiry does not book a ticket. A flight or package reservation is confirmed only after you approve an option and the required booking and payment process is completed with the airline or supplier.",
  },
];
