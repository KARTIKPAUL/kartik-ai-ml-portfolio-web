const steps = [
  {
    id: 1,
    title: "Import Libraries & Initialize Plotly",
    description:
      "Import Plotly, Pandas, and Matplotlib, then set up the notebook renderer.",
    code: `import plotly.graph_objs as go
import plotly.io as pio
import plotly.express as px
import pandas as pd
import matplotlib.pyplot as plt
import plotly.offline as py
from plotly.figure_factory import create_table

py.init_notebook_mode(connected=True)
pio.renderers.default = 'colab'`,
    outputType: "text",
    output: "Library Imported Successfully",
  },

  {
    id: 2,
    title: "Load Primary Dataset",
    description: "Load the country-level COVID-19 dataset.",
    code: `# Importing Dataset 01
dataset1 = pd.read_csv("covid.csv")
dataset1.head()`,
    outputType: "image",
    output: "covid-step-02.png",
  },

  {
    id: 3,
    title: "Dataset Shape & Info",
    description: "Check the size and structure of the primary dataset.",
    code: `print(dataset1.shape)
print(dataset1.size)
dataset1.info()`,
    outputType: "image",
    output: "covid-step-03.png",
  },

  {
    id: 4,
    title: "Load Grouped Dataset",
    description:
      "Load the secondary, time-grouped COVID-19 dataset and inspect its columns.",
    code: `# Importing Dataset 2
dataset2 = pd.read_csv("covid_grouped.csv")
dataset2.head()

print(dataset2.shape)
print(dataset2.size)
dataset2.info()
dataset2.columns`,
    outputType: "image",
    output: "covid-step-04.png",
  },

  {
    id: 5,
    title: "Clean the Dataset",
    description:
      "Drop the daily 'New*' columns to keep only cumulative totals.",
    code: `# Cleaning dataframe
dataset1.drop(['NewCases', 'NewDeaths', 'NewRecovered'], axis=1, inplace=True)
dataset1.head()
dataset1.shape
dataset1.sample(5)`,
    outputType: "image",
    output: "covid-step-05.png",
  },

  {
    id: 6,
    title: "Styled Data Table",
    description: "Render the first 15 rows as a styled Plotly table.",
    code: `# Creating table using plotly express
colorscale = [[0, '#4d004c'], [.5, '#f2e5ff'], [1, '#fff']]
table = create_table(dataset1.head(15), colorscale=colorscale)
py.iplot(table)`,
    outputType: "image",
    output: "covid-step-06.png",
  },

  {
    id: 7,
    title: "Total Cases by Country",
    description: "Bar chart of total confirmed cases for the top 15 countries.",
    code: `px.bar(dataset1.head(15), x='Country/Region', y='TotalCases',
       color='TotalCases', height=500,
       hover_data=['Country/Region', 'Continent'])`,
    outputType: "image",
    output: "covid-step-07.png",
  },

  {
    id: 8,
    title: "Total Deaths by Country",
    description: "Bar chart of total deaths for the top 15 countries.",
    code: `px.bar(dataset1.head(15), x='Country/Region', y='TotalDeaths',
       color='TotalDeaths', height=500,
       hover_data=['Country/Region', 'Continent'])`,
    outputType: "image",
    output: "covid-step-08.png",
  },

  {
    id: 9,
    title: "Total Tests by Country",
    description:
      "Vertical and horizontal bar charts of total tests conducted, by country and continent.",
    code: `px.bar(dataset1.head(15), x = 'TotalTests', y = 'Continent',
       color = 'TotalTests',orientation ='h',  height = 500,
       hover_data = ['Country/Region', 'Continent'])`,
    outputType: "image",
    output: "covid-step-09.png",
  },

  {
    id: 10,
    title: "Cases by Continent",
    description:
      "Scatter and bubble charts comparing total cases and total tests across continents.",
    code: `# Scatter plot
px.scatter(dataset1, x='Continent', y='TotalCases',
           hover_data=['Country/Region', 'Continent'],
           color='TotalCases', size='TotalCases', size_max=80)`,
    outputType: "image",
    output: "covid-step-10.png",
  },

  {
    id: 11,
    title: "Bubble Chart — Cases & Deaths by Country",
    description:
      "Country-wise bubble charts sizing markers by total cases and total deaths.",
    code: `#px.scatter(dataset1.head(10), x='Country/Region', y='TotalDeaths',
           hover_data=['Country/Region', 'Continent'],
           color='Country/Region', size='TotalDeaths', size_max=80)`,
    outputType: "image",
    output: "covid-step-11.png",
  },

  {
    id: 12,
    title: "Tests per Million Population",
    description:
      "Bubble chart of testing rate (tests per 1M population) by country.",
    code: `px.scatter(dataset1.head(30), x='Country/Region', y='Tests/1M pop',
           hover_data=['Country/Region', 'Continent'],
           color='Tests/1M pop', size='Tests/1M pop', size_max=80)`,
    outputType: "image",
    output: "covid-step-12.png",
  },
];

export default steps;
