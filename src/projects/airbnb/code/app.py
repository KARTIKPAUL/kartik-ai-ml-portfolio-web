# Importing Necessary Libraries and Loading the AirBNB Dataset
import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns


# Load the dataset
file_path = "Airbnb_Open_Data.csv"
df = pd.read_csv(file_path,low_memory=False)
# print(df.head())


# Check the column names in the Dataset
# print(df.columns)

# Check for Missing Values
# print(df.isnull().sum())

# Handle Missing Values
# Convert 'last review' to datetime and handle errors
df['last review'] = pd.to_datetime(df['last review'],errors='coerce')
# Fill missing values
df.fillna({'reviews per month': 0, 'last review': df['last review'].min()},inplace=True)
# Drop records with missing 'name' or 'host name'
df.dropna(subset=['NAME','host name'],inplace=True)

# print(df.isnull().sum())




# Correct Data Types
# Remove dollar signs and convert to float
df['price'] = df['price'].replace(r'[\$,]', '', regex=True).astype(float)
df['service fee'] = df['service fee'].replace(r'[\$,]', '', regex=True).astype(float)

# print(df.isnull().sum())

# Remove Duplicates
df.drop_duplicates(inplace=True)
# print(df.isnull().sum())

# Confirm Data Cleaning
# print(df.info())

# Descriptive Statistics
# print(df.describe())


# Visualization
# plt.figure(figsize=(10,6))
# sns.histplot(df['price'],bins=50,kde=True)
# plt.title('Distribution of Listing Prices')
# plt.xlabel('Price ($)')
# plt.ylabel('Frequency')
# plt.show()


# Room Type Analysis
# plt.figure(figsize=(8,5))
# sns.countplot(x='room type',data=df,color='green')
# plt.title('Room Type Distributaion')
# plt.xlabel('Room Type')
# plt.ylabel('Count')
# plt.show()


# Neighborhood Analysis
# plt.figure(figsize=(12, 8))
# sns.countplot(y='neighbourhood group', data=df,color="lightgreen" , order=df['neighbourhood group'].value_counts().index)
# plt.title('Number of Listings by Neighborhood Group')
# plt.xlabel('Count')
# plt.ylabel('Neighborhood Group')
# plt.show()


# Price vs. Room Type
# plt.figure(figsize=(10, 6))
# sns.boxplot(x='room type', y='price', hue='room type', data=df, palette='Set2')
# plt.title('Price vs. Room Type')
# plt.xlabel('Room Type')
# plt.ylabel('Price ($)')
# plt.legend(title='Room Type')
# plt.show()



# Reviews Over Time
df['last review'] = pd.to_datetime(df['last review'])
reviews_over_time = df.groupby(df['last review'].dt.to_period('M')).size()

plt.figure(figsize=(12, 6))
reviews_over_time.plot(kind='line',color='red')
plt.title('Number of Reviews Over Time')
plt.xlabel('Date')
plt.ylabel('Number of Reviews')
plt.show()
