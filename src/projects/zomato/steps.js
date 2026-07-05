const steps = [
  {
    id: 1,
    title: "Import Libraries",
    description: "Import all required Python libraries.",
    code: `import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    import seaborn as sns`,
    outputType: "text",
    output: "Libraries imported successfully.",
  },

  {
    id: 2,
    title: "Load Dataset",
    description: "Load the Zomato dataset.",
    code: `dataframe = pd.read_csv("content/Zomato-data.csv")
    print(dataframe.head())`,
    outputType: "image",
    output: "zomato-step-01.png",
  },

  {
    id: 3,
    title: "Data Cleaning",
    description: "Convert ratings into float values.",
    code: `def handleRate(value):
    value = str(value).split('/')
    value = value[0]
    return float(value)

dataframe['rate']=dataframe['rate'].apply(handleRate)
print(dataframe.head())`,
    outputType: "image",
    output: "zomato-step-02.png",
  },

  {
    id: 4,
    title: "Dataset Information",
    description: "Display dataframe information.",
    code: `dataframe.info()`,
    outputType: "image",
    output: "zomato-step-03.png",
  },

  {
    id: 5,
    title: "Missing Values",
    description: "Check null values.",
    code: `print(dataframe.isnull().sum())`,
    outputType: "image",
    output: "zomato-step-04.png",
  },

  {
    id: 6,
    title: "Restaurant Types",
    description: "Visualize restaurant types.",
    code: `sns.countplot(x=dataframe['listed_in(type)'])
    plt.xlabel("Type of restaurant")`,
    outputType: "image",
    output: "zomato-step-05.png",
  },

  {
    id: 7,
    title: "Votes Analysis",
    description: "Restaurant votes by category.",
    code: `grouped_data=dataframe.groupby('listed_in(type)')['votes'].sum()
    result = pd.DataFrame({'votes': grouped_data})
plt.plot(result, c='green', marker='o')
plt.xlabel('Type of restaurant', c='red', size=20)
plt.ylabel('Votes', c='red', size=20)`,
    outputType: "image",
    output: "zomato-step-06.png",
  },

  {
    id: 8,
    title: "Restaurant With Maximum Votes",
    description: "Find restaurant with highest votes.",
    code: `max_votes=dataframe['votes'].max()
    restaurant_with_max_votes = dataframe.loc[dataframe['votes'] == max_votes, 'name']

print('Restaurant(s) with the maximum votes:')
print(restaurant_with_max_votes)`,
    outputType: "image",
    output: "zomato-step-07.png",
  },

  {
    id: 9,
    title: "Online Order",
    description: "Chart Of Online Order",
    code: `sns.countplot(x=dataframe['online_order'])`,
    outputType: "image",
    output: "zomato-step-08.png",
  },

  {
    id: 10,
    title: "Rating Distribution",
    description: "Histogram of ratings.",
    code: `plt.hist(dataframe['rate'])
    plt.title('Ratings Distribution')
plt.show()`,
    outputType: "image",
    output: "zomato-step-09.png",
  },
  {
    id: 11,
    title: "Couple DataFrame",
    description: "Couple DataFrame",
    code: `couple_data=dataframe['approx_cost(for two people)']
sns.countplot(x=couple_data)`,
    outputType: "image",
    output: "zomato-step-10.png",
  },
  {
    id: 12,
    title: "Rating Distribution",
    description: "Histogram of ratings.",
    code: `plt.figure(figsize = (6,6))
sns.boxplot(x = 'online_order', y = 'rate', data = dataframe)`,
    outputType: "image",
    output: "zomato-step-11.png",
  },
  {
    id: 13,
    title: "Rating Distribution",
    description: "Histogram of ratings.",
    code: `pivot_table = dataframe.pivot_table(index='listed_in(type)', columns='online_order', aggfunc='size', fill_value=0)
sns.heatmap(pivot_table, annot=True, cmap='YlGnBu', fmt='d')
plt.title('Heatmap')
plt.xlabel('Online Order')
plt.ylabel('Listed In (Type)')
plt.show()`,
    outputType: "image",
    output: "zomato-step-12.png",
  },
];

export default steps;
