export const SITE = {
  name: "Threads Physio",
  phone: "+91-9310138022",
  phoneRaw: "+919310138022",
  headerPhone: "+919310138022",
  email: "threadsphysio@gmail.com",
  proposalEmail: "physiothreads@gmail.com",
  address: "F, 10/4, Golf Course Rd, DLF Phase 1, Sector 27, Gurugram, Haryana 122001",
  whatsapp: "https://api.whatsapp.com/send?phone=919310138022&text=Hi%20%2C%20I%20want%20to%20book%20an%20appointment",
  maps: "https://www.google.com/maps/place/Threads+Physio/@28.4644116,77.0943266,17z",
  mapEmbed: "https://maps.google.com/maps?q=Threads%20Physio%20Golf%20Course%20Rd%20Gurugram&t=m&z=15&output=embed&iwloc=near",
  social: {
    linkedin: "https://www.linkedin.com/company/threads-physio/",
    instagram: "https://www.instagram.com/threadsphysio",
    youtube: "https://www.youtube.com/@ThreadsPhysio",
  },
};

export type NavItem = { label: string; href: string; children?: NavItem[] };
export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/our-services/", children: [
    { label: "ACL Surgery", href: "/our-services/acl-surgery/" },
    { label: "Sports Physiotherapy", href: "/our-services/sports-physiotherapy/" },
    { label: "Bio Mechanical Assessment", href: "/our-services/bio-mechanical-assessment/" },
    { label: "Sports Specific Training", href: "/our-services/sports-specific-training/" },
    { label: "High Performance Training", href: "/our-services/high-performance-training/" },
    { label: "Injury Prevention", href: "/our-services/injury-prevention/" },
    { label: "Online Physiotherapy", href: "/our-services/online-physiotherapy/" },
    { label: "Acupuncture Therapy", href: "/acupuncture-treatment-in-gurgaon/" },
  ]},
  { label: "Programmes", href: "/programmes/", children: [
    { label: "Return to Sports after ACL Surgery", href: "/programmes/return-to-sports-after-acl-surgery/" },
    { label: "Return to Sports after Shoulder Surgery", href: "/programmes/return-to-sports-after-shoulder-surgery/" },
    { label: "Fit to Run", href: "/programmes/fit-to-run/" },
    { label: "High Performance Program", href: "/programmes/high-performance-program/" },
    { label: "Corporate Wellness Programme", href: "/programmes/corporate-wellness-programme/" },
  ]},
  { label: "Conditions", href: "/conditions/", children: [
    { label: "ACL Rehabilitation", href: "/conditions/acl-rehabilitation/" },
    { label: "Sports Injury Rehabilitation", href: "/conditions/sports-injury-rehabilitation/" },
    { label: "Chronic Pain in Elderly", href: "/conditions/chronic-pain-in-elderly/" },
    { label: "Post Operative Rehabilitation Clinic in Gurgaon", href: "/conditions/post-operative-rehabilitation/" },
  ]},
  { label: "Treatments", href: "#", children: [
    { label: "Back Pain", href: "/back-pain-treatment-gurgaon/" },
    { label: "Arthritis", href: "/arthritis-treatment-in-gurgaon/" },
    { label: "Foot & Ankle Pain", href: "/foot-and-ankle-pain-treatment-in-gurgaon/" },
    { label: "Shoulder Pain", href: "/shoulder-pain-treatment-in-gurgaon/" },
  ]},
  { label: "About Us", href: "/about-us/", children: [
    { label: "Meet Our Specialist", href: "/about-us/meet-our-specialist/" },
    { label: "Testimonials", href: "/testimonials/" },
    { label: "Sports Physiotherapist Internship Program", href: "/about-us/sports-physiotherapist-internship-program/" },
  ]},
  { label: "Blogs", href: "/blogs/" },
  { label: "Contact Us", href: "/contact-us/" },
];

export const REVIEWS = [
  { name: "Aditya Sharma", text: "Recently, I underwent ACL reconstruction surgery with orthopedic surgeon Dr. Manu Bora . Just a day after the surgery, I am feeling much better Dr. Manu Bora explained the entire process in detail before the surgery. His team was very professional and caring. I am sincerely grateful to Dr. Manu Bora and his team. Their expertise and dedication made my ACL surgery experience positive. I highly recommend him for orthopedic surgery." },
  { name: "Shakeel Ahmed", text: "Got my ACL surgery done by Dr. Manu Bora. One of the finest doctor I have ever met. Explains everything in details to the patients. Dr. Bora is never in a hurry and always addresses every minor doubts which I had. Also his team is very helpful be in case of pre surgery coordination or post surgery rehabilitation. Also special thanks to Pristyn Care which coordinated everything as I was traveling from a different state and they were helpful in every step." },
  { name: "Simran Kaur", text: "Underwent MPFL reconstruction surgery performed by Dr. Manu Bora for chronic patellar dislocation. His exceptional skills and confidence, along with accurate diagnosis, gave me much reassurance. Out of all the other doctors I have seen, Dr. Manu Bora is the only one I could trust with my injury, and I decided to proceed with the surgery. The surgery, with minimal invasion, and recovery has been exactly as he described it would be. His physiotherapy team, especially Dr. Dhruvi Gandhi, guided me through post-operative rehabilitation and my recovery has been progressing really well. I can't thank him and his team enough for treating me in the best way possible. I am so grateful. Thank you so much Dr. Manu Bora." },
  { name: "Praveen Kumar", text: "I think, rarely this types of orthopaedic doctor practice in India. Dr. Manu Bora is really best ortho surgeon. Very patiently he described the factors." },
  { name: "Sanjay Yadav", text: "Thanks to doctor Manu Bora for my ACL surgery, overall good experience the way he talk to patient and explain everything in details.Dr Manu Bora Team done good job they are very polite & helpful. Special thanks to Dr.Manu Bora, Mr. Vipin singh and Dr. Manasee.But Manu sir if you don't mind Silver Streak hospital is not a good hospital, not suit your personality, facilities totally zero, Sir please Avoid this types of hospital if possible. Thanks Sanjay Yadav" },
  { name: "RC Sonkar", text: "Hi I'm Chandni Sonkar From Jharkhand and I very glad to discuss with you about the Dr Manu Bora and his team Dr Manu Bora his a very good orthopaedic Dr and his team also also very cooperative team. when I searched many dr for my friend ankle joint pain so I can't found but suddenly i trying on YouTube and I found dr Manu Bora and book my appointment. but the best part of all these is the may was the in Jharkhand and i doing everything this on a simple phone call just like appointment booking and management everything and dr Manu Bora and his team response everything's every time I can't imagen in our India has best Hospital and best orthopaedic Dr. i proud of. I am proud that my friend's operation was done by him and my friend is getting well just because of him. Thankyou so much sir Dr Manu Bora and also Thankyou the team of Manu Bora.🙏You all are very good and very cooperative.Dr. Manu Bora is the best Dr Ever" },
];

export const COUNTERS = [
  { value: 150, label: "Non Operative Rehab" },
  { value: 150, label: "Shoulder" },
  { value: 200, label: "Ankle" },
  { value: 1000, label: "ACL & Knee Injuries" },
];

export const STEPS = [
  "WhatsApp Your MRI / Reports at +91-9310138022",
  "Get Free Online Opinion",
  "Fix Appointment & Meet Our Expert",
  "Confirm The Diagnosis and Treatment Plan",
  "Get Back To Sports & Running In 3 Months",
];

export const SITE_URL = "https://www.threadsphysio.com";
