import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 40 Hindu Girls (80%)
const girlNames = [
  "Priya Sharma", "Ananya Verma", "Pooja Mishra", "Sneha Joshi", "Ritu Patel",
  "Divya Chauhan", "Tanvi Gupta", "Ishita Roy", "Shreya Nair", "Kavita Agrawal",
  "Aditi Saxena", "Megha Singhal", "Neha Trivedi", "Simran Bhatia", "Rashi Tiwari",
  "Aarohi Deshmukh", "Sanya Kapoor", "Palak Pandey", "Komal Sharma", "Kritika Sen",
  "Mansi Kulkarni", "Swati Dubey", "Anjali Kashyap", "Deepika Rawat", "Radhika Mathur",
  "Bhavna Shukla", "Meenakshi Soni", "Chetna Choudhary", "Roshni Bajpai", "Payal Mehta",
  "Garima Bhatt", "Shalini Dixit", "Nidhi Upadhyay", "Shruti Rastogi", "Sakshi Goel",
  "Vandana Kaushik", "Harshita Rathore", "Jyoti Negi", "Pallavi Tyagi", "Sonali Chawla"
];

// 10 Hindu Boys (20%)
const boyNames = [
  "Aarav Sharma", "Rohan Verma", "Aditya Mishra", "Vikram Singh", "Mayank Joshi",
  "Rahul Saxena", "Abhishek Gupta", "Harshvardhan Trivedi", "Devendra Pandey", "Kunal Bhatnagar"
];

const femaleAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
];

const maleAvatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80"
];

const reviewComments = [
  "Sach me bahut useful hai! {productName} dekh kar hi sab samajh aa gaya, language bhi super easy hai. ❤️",
  "Instant download link immediately mil gaya! {productName} ke diagrams and notes quality is top tier! 🔥",
  "Best investment ever! {productName} has so many practical examples. Worth 10x the price! 🙌",
  "Maine kal raat checkout kiya tha, {productName} ka content ekdum clear aur direct hai without any fluff! 👍",
  "Mobile me read karna bahut comfortable hai. {productName} is 100% recommended to all! 🚀",
  "Finally genuine and high quality material mila. {productName} exceeded all my expectations! 💯",
  "Format bahut clean hai and step-by-step explained hai. {productName} mere liye best resource raha. 😊",
  "If you are confused where to start, just get {productName}. Everything is organized logically!",
  "Price ke hisab se content unbelievable hai! Highly impressed with {productName} quality. ⭐⭐⭐⭐⭐",
  "Mujhe revision ke liye perfect material mila. {productName} saved me at least 40+ hours!",
  "Illustrations and case studies are brilliant! {productName} made difficult concepts very simple. 👌",
  "Customer support team bhi instantly reply karti hai. {productName} download link worked smoothly.",
  "Maine friends ko bhi recommend kiya hai. {productName} is an absolute must-have package! ✨",
  "Concepts ko visually samjhaya gaya hai. {productName} is totally worth every single rupee.",
  "Super organized! {productName} helped me prepare thoroughly in just a few days. 👏",
  "Quality dekh kar proud feel hua. {productName} is clean, modern and very helpful.",
  "Zero unnecessary theory, seedha point-to-point explanations in {productName}! Loved it. ❤️",
  "Best part is that {productName} works on both phone and laptop smoothly without formatting issues.",
  "100% authentic verified purchase. {productName} made my learning journey so smooth.",
  "Instant checkout flow was seamless. {productName} resources are top-notch!"
];

const replyTemplates = [
  "Thank you {name}! We put a lot of heart into making it clear and actionable. Happy learning! ❤️",
  "So glad to hear this, {name}! Best of luck with your journey 🚀",
  "Thank you {name}! Enjoy implementing the resources. Let us know if you need any help 🙌",
  "Really appreciate your kind review, {name}! Keep learning and growing ✨",
  "Thanks {name}! We're thrilled that you found the layout and explanations so helpful 😊"
];

const timeAgos = ["2d", "3d", "4d", "5d", "6d", "1w", "1w", "2w"];
const replyTimeAgos = ["1d", "2d", "3d", "4d", "5d", "6d"];

function generateReviews() {
  const reviews = [];

  // Combine girls and boys maintaining 80% girls and 20% boys
  const userList = [
    ...girlNames.map(name => ({ name, isGirl: true })),
    ...boyNames.map(name => ({ name, isGirl: false }))
  ];

  // Shuffle slightly but ensure rich variety
  userList.forEach((user, index) => {
    const firstName = user.name.split(' ')[0];
    const lastName = user.name.split(' ')[1] || '';
    
    // Create authentic handle e.g. priya_sharma, sneha.joshi94
    const handleVariants = [
      `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}${lastName.toLowerCase().slice(0, 1)}_${index + 1}`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase().slice(0, 3)}`
    ];
    const username = handleVariants[index % handleVariants.length];

    const avatar = user.isGirl
      ? femaleAvatars[index % femaleAvatars.length]
      : maleAvatars[index % maleAvatars.length];

    const commentTemplate = reviewComments[index % reviewComments.length];
    const replyTemplate = replyTemplates[index % replyTemplates.length].replace(/{name}/g, firstName);

    const timeAgo = timeAgos[index % timeAgos.length];
    const replyTimeAgo = replyTimeAgos[index % replyTimeAgos.length];
    const likes = (index % 5) + 2; // 2 to 6 likes

    reviews.push({
      id: `rev-${index + 1}`,
      productSlug: "all",
      categorySlug: "all",
      username: username,
      userDisplayName: user.name,
      avatar: avatar,
      timeAgo: timeAgo,
      likedByAuthor: true,
      likes: likes,
      rating: 5,
      comment: commentTemplate,
      reply: {
        authorHandle: "selfnotes99",
        authorName: "Self Notes Team",
        authorAvatar: "/images/logo.png",
        timeAgo: replyTimeAgo,
        text: replyTemplate,
        likes: index % 2 === 0 ? 1 : 0
      },
      verified: true
    });
  });

  return reviews;
}

const reviews = generateReviews();
const targetPath = path.resolve(__dirname, '../src/data/reviews.json');
fs.writeFileSync(targetPath, JSON.stringify(reviews, null, 2), 'utf-8');
console.log(`Successfully generated ${reviews.length} reviews in ${targetPath}`);
