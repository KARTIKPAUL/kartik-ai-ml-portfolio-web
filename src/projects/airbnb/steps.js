const steps = [
  {
    id: 1,
    title: "Import Libraries & Load Dataset",
    description: "Import required libraries and load the Airbnb Open Data CSV.",
    code: `import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

file_path = "Airbnb_Open_Data.csv"
df = pd.read_csv(file_path, low_memory=False)
print(df.head())`,
    outputType: "image",
    output: "step1.png",
  },

  {
    id: 2,
    title: "Explore Dataset Structure",
    description: "Check column names and count missing values per column.",
    code: `print(df.columns)`,
    outputType: "image",
    output: "step2.png",
  },

  {
    id: 3,
    title: "Explore Dataset Structure",
    description: "Check column names and count missing values per column.",
    code: `print(df.isnull().sum())`,
    outputType: "image",
    output: "step3.png",
  },

  {
    id: 4,
    title: "Handle Missing Values",
    description:
      "Parse review dates, fill missing reviews/dates, and drop rows with no name or host name.",
    code: `df['last review'] = pd.to_datetime(df['last review'], errors='coerce')

df.fillna({'reviews per month': 0, 'last review': df['last review'].min()}, inplace=True)

df.dropna(subset=['NAME', 'host name'], inplace=True)

print(df.isnull().sum())`,
    outputType: "image",
    output: "step4.png",
  },

  {
    id: 5,
    title: "Correct Data Types",
    description:
      "Strip currency symbols from price fields and convert them to float.",
    code: `df['price'] = df['price'].replace(r'[\\$,]', '', regex=True).astype(float)
df['service fee'] = df['service fee'].replace(r'[\\$,]', '', regex=True).astype(float)

print(df.isnull().sum())`,
    outputType: "image",
    output: "step6.png",
  },

  {
    id: 6,
    title: "Remove Duplicates",
    description: "Drop duplicate listings from the dataset.",
    code: `df.drop_duplicates(inplace=True)
print(df.isnull().sum())`,
    outputType: "image",
    output: "step6.png",
  },

  {
    id: 7,
    title: "Confirm Data Cleaning",
    description: "Review the cleaned dataframe's structure and dtypes.",
    code: `print(df.info())`,
    outputType: "image",
    output: "step7.png",
  },

  {
    id: 8,
    title: "Descriptive Statistics",
    description: "Generate summary statistics across all numeric columns.",
    code: `print(df.describe())`,
    outputType: "image",
    output: "step8.png",
  },

  {
    id: 9,
    title: "Price Distribution",
    description: "Visualize how listing prices are distributed.",
    code: `plt.figure(figsize=(10, 6))
sns.histplot(df['price'], bins=50, kde=True)
plt.title('Distribution of Listing Prices')
plt.xlabel('Price ($)')
plt.ylabel('Frequency')
plt.show()`,
    outputType: "image",
    output: "step9.png",
  },

  {
    id: 10,
    title: "Room Type Distribution",
    description: "Compare listing counts across room types.",
    code: `plt.figure(figsize=(8, 5))
sns.countplot(x='room type', data=df, color='green')
plt.title('Room Type Distribution')
plt.xlabel('Room Type')
plt.ylabel('Count')
plt.show()`,
    outputType: "image",
    output: "step10.png",
  },

  {
    id: 11,
    title: "Neighborhood Group Analysis",
    description: "Rank neighborhood groups by number of listings.",
    code: `plt.figure(figsize=(12, 8))
sns.countplot(
    y='neighbourhood group',
    data=df,
    color="lightgreen",
    order=df['neighbourhood group'].value_counts().index
)
plt.title('Number of Listings by Neighborhood Group')
plt.xlabel('Count')
plt.ylabel('Neighborhood Group')
plt.show()`,
    outputType: "image",
    output: "step11.png",
  },
  {
    id: 12,
    title: "Price vs. Room Type",
    description: "Visualize the relationship between price and room type.",
    code: `plt.figure(figsize=(10, 6))
sns.boxplot(x='room type', y='price', hue='room type', data=df, palette='Set2')
plt.title('Price vs. Room Type')
plt.xlabel('Room Type')
plt.ylabel('Price ($)')
plt.legend(title='Room Type')
plt.show()`,
    outputType: "image",
    output: "step12.png",
  },
  {
    id: 13,
    title: "Reviews Over Time",
    description: "Plot the number of reviews over time.",
    code: `plt.figure(figsize=(12, 6))
reviews_over_time.plot(kind='line',color='red')
plt.title('Number of Reviews Over Time')
plt.xlabel('Date')
plt.ylabel('Number of Reviews')
plt.show()`,
    outputType: "image",
    output: "step13.png",
  },
];

export default steps;
