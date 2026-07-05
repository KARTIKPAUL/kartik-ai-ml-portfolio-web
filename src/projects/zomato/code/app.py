# Importing necessary Python libraries.

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Creating the data frame.
dataframe = pd.read_csv("content/Zomato-data.csv")
print(dataframe.head())


# Data Cleaning and Preparation
def handleRate(value):
    value = str(value).split('/')
    value = value[0]
    return float(value)

dataframe['rate'] = dataframe['rate'].apply(handleRate)
print(dataframe.head())

# Getting summary of the dataframe use df.info().
dataframe.info()

# Checking for missing or null values to identify any data gaps.
print(dataframe.isnull().sum())

# Exploring Restaurant Types
sns.countplot(x=dataframe['listed_in(type)'])
plt.xlabel("Type Of Resturant")
plt.show()

# Votes by Restaurant Type
grouped_data = dataframe.groupby('listed_in(type)')['votes'].sum()
result = pd.DataFrame({'Votes' : grouped_data})
plt.plot(result,c='green',marker='o')
plt.xlabel("Types Of Resturant")
plt.ylabel('votes')
plt.show()

# Identify the Most Voted Restaurant
max_votes = dataframe['votes'].max()
resturant_with_max_votes = dataframe.loc[dataframe['votes'] == max_votes , 'name']
print('Resturant with maximum votes: ',resturant_with_max_votes)

# Online Order Availability
sns.countplot(x=dataframe['online_order'])
plt.xlabel("Order Order Available")
plt.show()

# Analyze Ratings
plt.hist(dataframe['rate'],bins=5)
plt.title("Rating Distribution")
plt.show()

# Approximate Cost for Couples
couple_data = dataframe['approx_cost(for two people)']
sns.countplot(x=couple_data)
plt.show()


# Ratings Comparison - Online vs Offline Orders
plt.figure(figsize = (6,6))
sns.boxplot(x = 'online_order',y='rate',data=dataframe)
plt.show()



# Order Mode Preferences by Restaurant Type
pivot_table = dataframe.pivot_table(index='listed_in(type)', columns='online_order', aggfunc='size', fill_value=0)
sns.heatmap(pivot_table,annot=True,cmap='YlGnBu',fmt='d')
plt.title('Heatmap')
plt.xlabel("Online Order")
plt.ylabel("Listed In(type)")
plt.show()

