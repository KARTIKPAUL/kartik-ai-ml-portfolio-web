const steps = [
  {
    id: 1,
    title: "Import Libraries",
    description: "Import data, NLP, and deep learning libraries for the pipeline.",
    code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

import string
import nltk
from nltk.corpus import stopwords
from wordcloud import WordCloud
nltk.download('stopwords')

import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split
from keras.callbacks import EarlyStopping, ReduceLROnPlateau

import warnings
warnings.filterwarnings('ignore')`,
    outputType: "text",
    output: "Import Library Successfully !",
  },

  {
    id: 2,
    title: "Load Dataset",
    description: "Load the spam/ham email dataset and inspect its shape.",
    code: `data = pd.read_csv("spam_ham_dataset.csv")
data.head()
data.shape`,
    outputType: "image",
    output: "spam-step-01.png",
  },

  {
    id: 3,
    title: "Class Distribution",
    description: "Visualize how many spam vs ham messages exist before balancing.",
    code: `sns.countplot(x="label", data=data)
plt.show()`,
    outputType: "image",
    output: "spam-step-02.png",
  },

  {
    id: 4,
    title: "Balance the Dataset",
    description: "Downsample the majority class so spam and ham are equally represented.",
    code: `ham_msg = data[data['label'] == 'ham']
spam_msg = data[data['label'] == 'spam']
ham_msg_balanced = ham_msg.sample(n=len(spam_msg), random_state=42)
balanced_data = pd.concat([ham_msg_balanced, spam_msg]).reset_index(drop=True)

sns.countplot(x='label', data=balanced_data)
plt.title("Balanced Distribution of Spam and Ham Emails")
plt.xticks(ticks=[0, 1], labels=['Ham (Not Spam)', 'Spam'])`,
    outputType: "image",
    output: "spam-step-03.png",
  },

  {
    id: 5,
    title: "Strip Boilerplate Text",
    description: "Remove the recurring 'subject' token from every message.",
    code: `balanced_data['text'] = balanced_data['text'].str.replace('subject', '')
balanced_data.head()`,
    outputType: "image",
    output: "spam-step-04.png",
  },

  {
    id: 6,
    title: "Remove Punctuation",
    description: "Strip punctuation characters from the message text.",
    code: `punctuation_list = string.punctuation

def remove_punctuation(text):
    temp = str.maketrans('', '', punctuation_list)
    return text.translate(temp)

balanced_data['text'] = balanced_data['text'].apply(lambda x: remove_punctuation(x))
balanced_data.head()`,
    outputType: "image",
    output: "spam-step-05.png",
  },

  {
    id: 7,
    title: "Remove Stopwords",
    description: "Filter out common English stopwords to isolate meaningful terms.",
    code: `def remove_stopwords(text):
    stop_words = stopwords.words('english')
    imp_words = []
    for word in str(text).split():
        word = word.lower()
        if word not in stop_words:
            imp_words.append(word)
    return " ".join(imp_words)

balanced_data['text'] = balanced_data['text'].apply(lambda text: remove_stopwords(text))
balanced_data.head()`,
    outputType: "image",
    output: "spam-step-06.png",
  },

  {
    id: 8,
    title: "Word Cloud Visualization",
    description: "Compare the most frequent words in spam vs non-spam messages.",
    code: `def plot_word_cloud(data, typ):
    email_corpus = " ".join(data['text'])
    wc = WordCloud(background_color='black', max_words=100, width=800, height=400).generate(email_corpus)
    plt.figure(figsize=(7, 7))
    plt.imshow(wc, interpolation='bilinear')
    plt.title(f'WordCloud for {typ} Emails', fontsize=15)
    plt.axis("off")
    plt.show()

plot_word_cloud(balanced_data[balanced_data['label'] == 'ham'], typ='Non-Spam')
plot_word_cloud(balanced_data[balanced_data['label'] == 'spam'], typ='Spam')`,
    outputType: "image",
    output: "spam-step-07.png",
  },

  {
    id: 9,
    title: "Tokenization & Padding",
    description: "Split into train/test sets, then tokenize and pad message sequences to a fixed length.",
    code: `train_X, test_X, train_Y, test_Y = train_test_split(
    balanced_data['text'], balanced_data['label'], test_size=0.2, random_state=42
)

tokenizer = Tokenizer()
tokenizer.fit_on_texts(train_X)

train_sequences = tokenizer.texts_to_sequences(train_X)
test_sequences = tokenizer.texts_to_sequences(test_X)

max_len = 100
train_sequences = pad_sequences(train_sequences, maxlen=max_len, padding='post', truncating='post')
test_sequences = pad_sequences(test_sequences, maxlen=max_len, padding='post', truncating='post')`,
    outputType: "text",
    output: "See Below For Further Execution ",
  },

  {
    id: 10,
    title: "Build the LSTM Model",
    description: "Define an embedding + LSTM architecture for binary spam classification.",
    code: `model = tf.keras.models.Sequential([
    tf.keras.layers.Input(shape=(max_len,)),
    tf.keras.layers.Embedding(input_dim=len(tokenizer.word_index) + 1, output_dim=32, input_length=max_len),
    tf.keras.layers.LSTM(16),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(
    loss=tf.keras.losses.BinaryCrossentropy(from_logits=False),
    optimizer='adam',
    metrics=['accuracy']
)`,
    outputType: "image",
    output: "spam-step-08.png",
  },

  {
    id: 11,
    title: "Train the Model",
    description: "Fit the LSTM with early stopping and learning-rate reduction on plateau.",
    code: `es = EarlyStopping(patience=3, monitor='val_accuracy', restore_best_weights=True)
lr = ReduceLROnPlateau(patience=2, monitor='val_loss', factor=0.5, verbose=0)

history = model.fit(
    train_sequences, train_Y,
    validation_data=(test_sequences, test_Y),
    epochs=20,
    batch_size=32,
    callbacks=[lr, es]
)
    model.summary()`,
    outputType: "image",
    output: "spam-step-09.png",
  },

  {
    id: 12,
    title: "Evaluate & Plot Accuracy",
    description: "Report test loss/accuracy and plot training vs validation accuracy over epochs.",
    code: `test_loss, test_accuracy = model.evaluate(test_sequences, test_Y)
print('Test Loss :', test_loss)
print('Test Accuracy :', test_accuracy)

plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epochs')
plt.legend()
plt.show()`,
    outputType: "image",
    output: "spam-step-10.png",
  },
];

export default steps;