from transformers import pipeline
import pandas as pd
import numpy as np

sentiment_pipeline = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment-latest")

df= pd.read_csv("/kaggle/input/biefnlrfd/data.csv")

feedback = df.iloc[:,2]
feedback1= [i for i in feedback]
feedback1.append('it was very bad')

results = sentiment_pipeline(feedback1)
print(results)

scores = [-x['score'] if x['label']=='negative' else x['score'] for x in results]
mean = sum(scores) / len(scores)
print(mean*100)