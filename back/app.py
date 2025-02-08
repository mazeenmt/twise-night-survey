from flask import Flask, jsonify
from flask_cors import CORS 
from model import return_result
import pandas as pd
import datetime

app = Flask(__name__)
CORS(app)

# Load the dataset

df = pd.read_csv('../data.csv')
result = return_result()
# result = [
#     {"label": "positive", "score": 0.8},
#     {"label": "negative", "score": 0.1},
#     {"label": "neutral", "score": 0.1},
#     {"label": "positive", "score": 0.9},
#     {"label": "negative", "score": 0.2},
#     {"label": "neutral", "score": 0.6},
#     {"label": "positive", "score": 0.8},
#     {"label": "negative", "score": 0.1},
#     {"label": "neutral", "score": 0.1},
#     {"label": "positive", "score": 0.9},
#     {"label": "negative", "score": 0.2},
#     {"label": "neutral", "score": 0.6},
#     {"label": "positive", "score": 0.8},
#     {"label": "negative", "score": 0.1},
#     {"label": "neutral", "score": 0.1},
#     {"label": "positive", "score": 0.9},
#     {"label": "negative", "score": 0.2},
#     {"label": "neutral", "score": 0.6},
#     {"label": "positive", "score": 0.8},
#     {"label": "negative", "score": 0.1},
#     {"label": "neutral", "score": 0.1},
#     {"label": "positive", "score": 0.9},
#     {"label": "negative", "score": 0.2},
#     {"label": "neutral", "score": 0.6},
#     {"label": "positive", "score": 0.8},
#     {"label": "negative", "score": 0.1},
#     {"label": "neutral", "score": 0.1},
#     {"label": "positive", "score": 0.9},
#     {"label": "negative", "score": 0.2},
#     {"label": "neutral", "score": 0.6},
#     {"label": "positive", "score": 0.8},
#     {"label": "negative", "score": 0.1},
#     {"label": "neutral", "score": 0.1},
#     {"label": "positive", "score": 0.9},
#     {"label": "negative", "score": 0.2},
#     {"label": "neutral", "score": 0.6},
#     {"label": "positive", "score": 0.8},
#     {"label": "negative", "score": 0.1},
#     {"label": "neutral", "score": 0.1},
#     {"label": "positive", "score": 0.9},
# ]   

df['label'] = [r['label'] for r in result]
df['score'] = [r['score'] for r in result]

def process_satisfaction_data():
    # Total responses and counts per sentiment label.
    total_responses = len(df)
    positive = df[df['label'] == 'positive'].shape[0]
    negative = df[df['label'] == 'negative'].shape[0]
    neutral = df[df['label'] == 'neutral'].shape[0]
    print(positive)
    overall_satisfaction = round((positive / total_responses) * 100) if total_responses > 0 else 0


    # --- Top Praised Aspects ---
    aspects_series = df['most_praised_aspects'].dropna().apply(lambda x: [a.strip() for a in x.split(',')])
    all_aspects = [aspect for sublist in aspects_series for aspect in sublist]
    aspects_count = {}
    for aspect in all_aspects:
        aspects_count[aspect] = aspects_count.get(aspect, 0) + 1
    # Sort by frequency (highest first)
    top_aspects = sorted(aspects_count.items(), key=lambda x: x[1], reverse=True)
    topPraisedAspects = [{"aspect": aspect.title(), "score": count} for aspect, count in top_aspects[:4]]

    # --- Areas for Improvement ---
    improvements_series = df['areas_for_improvement'].dropna().apply(lambda x: [i.strip() for i in x.split(',')])
    all_improvements = [impr for sublist in improvements_series for impr in sublist]
    improvements_count = {}
    for impr in all_improvements:
        if impr != "None mentioned":
            improvements_count[impr] = improvements_count.get(impr, 0) + 1
    top_improvements = sorted(improvements_count.items(), key=lambda x: x[1], reverse=True)
    improvements = [{"aspect": impr.title(), "count": count} for impr, count in top_improvements[:4]]


    # --- Recent Comments ---
    # Take the last 3 reviews 
    recentComments = []
    for _, row in df.iterrows():
        if row['review_text'] != "None mentioned":
            recentComments.append({
                "id": str(row[0]),
                "comment": row[1],
                "sentiment": row['label'],
                "timestamp": datetime.datetime.utcnow().isoformat()
            })
        if len(recentComments)==3:
            break

    # --- Activities ---
    # Group by activity_name and compute the number of participants and average sentiment.
    activity_groups = df.groupby('customer_id').agg(
        participantCount=('customer_id', 'count'),
        averageSentiment=('score', 'mean')
    ).reset_index()
    
    activities_list = []
    for idx, row in activity_groups.iterrows():
        activities_list.append({
            "id": str(idx + 1),
            "name": row['customer_id'],
            "satisfaction": round(row['averageSentiment'] * 100),
            "participantCount": int(row['participantCount']),
            "engagement": round(row['averageSentiment'] * 100)  
        })

    # Build and return the complete result object.
    return {
        "eventTitle": "CPU Team Survey 2025",
        "lastUpdated": datetime.datetime.utcnow().isoformat(),
        "overallSatisfaction": overall_satisfaction,
        "totalResponses": total_responses,
        "responseBreakdown": {
            "satisfied": int(positive),
            "neutral": int(neutral),
            "dissatisfied": int(negative)
        },
        "topPraisedAspects": topPraisedAspects,
        "improvements": improvements,
        "recentComments": recentComments,
        "activities": activities_list
    }

@app.route("/api/satisfaction", methods=["GET"])
def get_satisfaction_data():
    data = process_satisfaction_data()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
