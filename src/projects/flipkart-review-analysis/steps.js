const steps = [
  {
    id: 1,
    title: "Import Libraries",
    description:
      "Import NLP, ML, and visualization libraries for the sentiment pipeline.",
    code: `import pandas as pd
import nltk
from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import seaborn as sns`,
    outputType: "text",
    output: "Library Imported Successfully !",
  },

  {
    id: 2,
    title: "Load Dataset",
    description: "Load the Flipkart reviews dataset and inspect its shape.",
    code: `file_path = 'flipkart_data.csv'
df = pd.read_csv(file_path)

df.head()
df.shape`,
    outputType: "image",
    output: "flipkart-step-02.png",
  },

  {
    id: 3,
    title: "Prepare Stopwords",
    description: "Download and load the English stopword list from NLTK.",
    code: `nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

len(stop_words)`,
    outputType: "text",
    output: "198",
  },

  {
    id: 4,
    title: "Preprocess Reviews & Label Sentiment",
    description:
      "Lowercase and strip stopwords from each review, then derive a binary sentiment label from the star rating.",
    code: `def preprocess_reviews_stopwords(df):
    df['review'] = df['review'].str.lower()
    df['review'] = df['review'].apply(
        lambda x: ' '.join([word for word in x.split() if word not in stop_words])
    )
    df['sentiment'] = df['rating'].apply(lambda x: 1 if x >= 4 else 0)
    return df
df_cleaned = preprocess_reviews_stopwords(df)
df`,
    outputType: "image",
    output: "flipkart-step-04.png",
  },

  {
    id: 5,
    title: "Sentiment Distribution",
    description:
      "Bar chart showing the balance of positive vs negative reviews.",
    code: `sentiment_counts = df_cleaned['sentiment'].value_counts()

plt.figure(figsize=(6, 4))
sentiment_counts.plot(kind='bar', color=['red', 'green'])
plt.title('Sentiment Distribution (0: Negative, 1: Positive)')
plt.xlabel('Sentiment')
plt.ylabel('Count')
plt.xticks(ticks=[0, 1], labels=['Negative', 'Positive'], rotation=0)
plt.show()`,
    outputType: "image",
    output: "flipkart-step-05.png",
  },

  {
    id: 6,
    title: "Word Cloud for Positive Reviews",
    description: "Visualize the most frequent words in positive reviews.",
    code: `positive_reviews = df_cleaned[df_cleaned['sentiment'] == 1]['review']
positive_text = ' '.join(positive_reviews)
wordcloud = WordCloud(width=800, height=400).generate(positive_text)

plt.figure(figsize=(8, 6))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis('off')
plt.title('Word Cloud for Positive Reviews')
plt.show()`,
    outputType: "image",
    output: "flipkart-step-06.png",
  },

  {
    id: 7,
    title: "TF-IDF Vectorization",
    description: "Convert cleaned review text into TF-IDF feature vectors.",
    code: `vectorizer = TfidfVectorizer(max_features=5000)
X = vectorizer.fit_transform(df_cleaned['review'])
y = df_cleaned['sentiment']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)
`,
    outputType: "text",
    output: "Model Evaluation Suceefully !",
  },

  {
    id: 8,
    title: "Confusion Matrix & Accuracy",
    description:
      "Evaluate predictions with a confusion matrix heatmap and overall accuracy.",
    code: `y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)

sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.show()

print(accuracy)`,
    outputType: "image",
    output: "flipkart-step-08.png",
  },

  {
    id: 9,
    title: "Predicted Sentiment Distribution",
    description: "Compare true vs predicted sentiment counts as a pie chart.",
    code: `labels = ['Negative', 'Positive']
sizes = pd.Series(y_pred).value_counts().sort_index()

plt.figure(figsize=(5,5))
plt.pie(sizes,
        labels=labels,
        autopct='%1.1f%%',
        startangle=90)

plt.title("Predicted Sentiment Distribution")
plt.show()`,
    outputType: "image",
    output: "flipkart-step-09.png",
  },

  {
    id: 10,
    title: "ROC Curve",
    description:
      "Plot the ROC curve with AUC.",
    code: `from sklearn.metrics import roc_curve, auc

y_prob = model.predict_proba(X_test)[:, 1]
fpr, tpr, _ = roc_curve(y_test, y_prob)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(6, 5))
plt.plot(fpr, tpr, label=f'AUC = {roc_auc:.2f}')
plt.plot([0, 1], [0, 1], linestyle='--')
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve")
plt.legend()
plt.show()`,
    outputType: "image",
    output: "flipkart-step-10.png",
  },
  {
    id: 11,
    title: "Top 20 Important Words",
    description:
      "Plot the the Top 20 Important Words",
    code: `feature_names = vectorizer.get_feature_names_out()

importance = pd.DataFrame({
    'Feature': feature_names,
    'Importance': model.feature_importances_
})

importance = importance.sort_values(
    by='Importance',
    ascending=False
).head(20)

plt.figure(figsize=(10,6))
plt.barh(importance['Feature'], importance['Importance'])
plt.title("Top 20 Important Words")
plt.xlabel("Importance")
plt.gca().invert_yaxis()
plt.show()`,
    outputType: "image",
    output: "flipkart-step-11.png",
  },

  {
    id: 12,
    title: "Try It Yourself — Live Sentiment Predictor",
    description:
      "Type any product review and get an instant sentiment prediction, right in the browser.",
    type: "interactive",
  },
];

export default steps;