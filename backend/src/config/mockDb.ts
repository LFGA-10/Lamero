// Mock Database Storage
export const mockPosts: any[] = [
  { 
    _id: "mock1", 
    authorName: "Anonymous Lily", 
    text: "Today I managed to leave the house for the first time in two weeks.", 
    group: "group_3", 
    likes: 24, 
    likedBy: [], 
    isAnonymous: true,
    createdAt: new Date().toISOString() 
  },
  { 
    _id: "mock2", 
    authorName: "HealingHeart", 
    text: "I had my first panic-free day in months.", 
    group: "group_1", 
    likes: 38, 
    likedBy: [], 
    isAnonymous: false,
    createdAt: new Date().toISOString() 
  }
];

export const mockUsers: any[] = [];
