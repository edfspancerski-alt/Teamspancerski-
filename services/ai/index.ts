import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface UserProfile {
  weight: number;
  height: number;
  age: number;
  goal: string;
  dietaryRestrictions?: string;
  budget?: number;
}

export const generateNutritionPlan = async (profile: UserProfile) => {
  const prompt = `Generate a personalized nutrition plan for a user with the following profile:
    Weight: ${profile.weight}kg, Height: ${profile.height}cm, Age: ${profile.age},
    Goal: ${profile.goal}, Dietary Restrictions: ${profile.dietaryRestrictions || 'None'},
    Monthly Budget: R$ ${profile.budget || 'Flexible'}.

    Provide a daily meal plan (Breakfast, Lunch, Snack, Dinner) and an automated shopping list with estimated costs.
    Respond in JSON format with "mealPlan" and "shoppingList" keys.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
};

export const getRecommendations = async (userProgress: any, goals: string) => {
  const prompt = `Based on the user progress ${JSON.stringify(userProgress)} and goals "${goals}",
    recommend 3 programs or focus areas for the next month.
    Respond in JSON format with "recommendations" as a list of objects (title, reason).`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
};
