const steps = [
  {
    id: 1,
    title: "Import Libraries",
    description:
      "Import Selenium, BeautifulSoup, Pandas, and Plotly for scraping and analysis.",
    code: `import requests
import pandas as pd
from selenium import webdriver
from bs4 import BeautifulSoup
import plotly.express as px`,
    outputType: "text",
    output: "Library Imported Sucessfully",
  },

  {
    id: 2,
    title: "Scrape IMDb Top Chart",
    description:
      "Launch a headless browser, load IMDb's Top Chart, and save the raw page HTML.",
    code: `url = "https://www.imdb.com/chart/top/"

driver = webdriver.Chrome()
driver.get(url)
html = driver.page_source

with open("imdb.html", "w", encoding="utf-8") as f:
    f.write(html)

print("HTML Saved Successfully!")`,
    outputType: "text",
    output: "HTML Saved Successfully!",
  },

  {
    id: 3,
    title: "Parse HTML & Select Movie Elements",
    description:
      "Parse the saved HTML with BeautifulSoup and select every movie list item.",
    code: `with open("imdb.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

movies = soup.select("li.ipc-metadata-list-summary-item")
print(len(movies))`,
    outputType: "text",
    output: "250",
  },

  {
    id: 4,
    title: "Extract Movie Data",
    description:
      "Pull the title, year, duration, and rating out of each movie entry.",
    code: `movie_data = []

for movie in movies:
    title = movie.select_one("h4.ipc-title__text").text.strip()
    metadata = movie.select("li.ipc-inline-list__item")
    year = metadata[0].text.strip()
    duration = metadata[1].text.strip()
    rating = movie.select_one(".ipc-rating-star--rating").text.strip()

    movie_data.append({
        "Title": title,
        "Year": year,
        "Duration": duration,
        "Rating": rating
    })

for movie in movie_data[:10]:
    print(f"{movie['Title']} ({movie['Year']}) - Rating: {movie['Rating']}")`,
    outputType: "image",
    output: "image1.png",
  },

  {
    id: 5,
    title: "Build the DataFrame",
    description: "Load the scraped movie data into a Pandas DataFrame.",
    code: `df = pd.DataFrame(movie_data)
df`,
    outputType: "image",
    output: "image2.png",
  },

  {
    id: 6,
    title: "Dataset Info & Summary Statistics",
    description: "Check column types, summary statistics, and missing values.",
    code: `df.info()
df.describe()
df.isnull().sum()`,
    outputType: "image",
    output: "image3.png",
  },

  {
    id: 7,
    title: "Clean Rating & Year Columns",
    description: "Convert the raw Rating and Year strings into numeric types.",
    code: `df["Rating"] = df["Rating"].astype(float)
df["Year"] = df["Year"].astype(int)

print(df["Rating"])
print(df["Year"])`,
    outputType: "text",
    output: "Converted Successfully",
  },

  {
    id: 8,
    title: "Clean Duration Column",
    description: "Convert runtime strings like '2h 22m' into total minutes.",
    code: `import re

def convert_duration(duration):
    match = re.match(r'(?:(\\d+)h)?\\s*(?:(\\d+)m)?', duration)
    hours = int(match.group(1)) if match.group(1) else 0
    minutes = int(match.group(2)) if match.group(2) else 0
    return hours * 60 + minutes

df["Duration"] = df["Duration"].apply(convert_duration)
df["Duration"]`,
    outputType: "text",
    output: "Format Change Successfully",
  },

  {
    id: 9,
    title: "Rating Distributions",
    description:
      "Histograms showing how ratings are distributed across the list.",
    code: `px.histogram(df, x="Rating", nbins=20, title="IMDb Rating Distribution")`,
    outputType: "image",
    output: "image4.png",
  },

  {
    id: 10,
    title: "Duration Distributions",
    description:
      "Histograms showing how runtimes are distributed across the list.",
    code: `px.histogram(df, x="Duration", nbins=20, title="Movie Runtime Distribution"))`,
    outputType: "image",
    output: "image5.png",
  },

  {
    id: 11,
    title: "Top 10 Highest Rated Movies",
    description:
      "Sort by rating and chart the 10 highest-rated movies horizontally.",
    code: `print("Total Movies :", len(df))

top10 = df.sort_values("Rating", ascending=False).head(10)

fig = px.bar(
    top10,
    x="Rating",
    y="Title",
    orientation="h",
    color="Rating",
    title="Top 10 Highest Rated Movies"
)
fig.update_layout(yaxis={'categoryorder': 'total ascending'})
fig.show()`,
    outputType: "image",
    output: "image6.png",
  },

  {
    id: 12,
    title: "Duration Of Movie",
    description:
      "Xxploring whether longer movies tends.",
    code: `fig = px.histogram(
    df,
    x="Duration",
    nbins=20,
    title="Movie Runtime Distribution"
)

fig.show()`,
    outputType: "image",
    output: "image7.png",
  },
];

export default steps;
