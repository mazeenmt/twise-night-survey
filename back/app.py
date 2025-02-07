from flask import Flask, jsonify
from flask_cors import CORS
import random
import datetime

app = Flask(__name__)
CORS(app)

result = [
    {"label": "positive", "score": 0.8},
    {"label": "negative", "score": 0.1},
    {"label": "neutral", "score": 0.1},
    {"label": "positive", "score": 0.9},
    {"label": "negative", "score": 0.2},
    {"label": "neutral", "score": 0.6}
]

def process_satisfaction_data(result):
    total_responses = len(result)
    positive = sum(1 for r in result if r["label"] == "positive")
    negative = sum(1 for r in result if r["label"] == "negative")
    neutral = sum(1 for r in result if r["label"] == "neutral")

    return {
        "eventTitle": "TechConf 2025",
        "lastUpdated": datetime.datetime.utcnow().isoformat(),
        "overallSatisfaction": round((positive / total_responses) * 100),
        "totalResponses": total_responses,
        "responseBreakdown": {
            "verySatisfied": positive * random.randint(1, 3),
            "satisfied": neutral * random.randint(1, 3),
            "neutral": neutral,
            "dissatisfied": negative * random.randint(1, 2),
            "veryDissatisfied": negative
        },
        "topPraisedAspects": [
            {"aspect": "Speaker Quality", "score": round(random.uniform(8, 10), 1)},
            {"aspect": "Venue", "score": round(random.uniform(7, 9), 1)},
            {"aspect": "Content", "score": round(random.uniform(8, 10), 1)},
            {"aspect": "Networking", "score": round(random.uniform(7, 9), 1)}
        ],
        "improvements": [
            {"aspect": "Session Length", "count": random.randint(10, 50)},
            {"aspect": "Break Duration", "count": random.randint(5, 40)},
            {"aspect": "Wi-Fi Speed", "count": random.randint(5, 30)}
        ],
        "trendData": [
            {
                "date": (datetime.datetime.utcnow() - datetime.timedelta(days=i)).strftime("%Y-%m-%d"),
                "satisfaction": random.randint(70, 100)
            }
            for i in range(7)
        ],
        "recentComments": [
            {
                "id": str(i + 1),
                "comment": random.choice(
                    [
                        "Amazing speakers and great insights!",
                        "The networking sessions were very productive",
                        "Wi-Fi could be better",
                        "Venue was fantastic!",
                        "Too many long sessions in one day"
                    ]
                ),
                "sentiment": random.choice(["positive", "neutral", "negative"]),
                "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(minutes=random.randint(1, 60))).isoformat()
            }
            for i in range(3)
        ],
        "activities": [
            {
                "id": str(i + 1),
                "name": random.choice(
                    ["Keynote Speech", "Workshop: AI Future", "Networking Lunch", "Panel Discussion", "Hands-on Lab"]
                ),
                "satisfaction": random.randint(75, 95),
                "participantCount": random.randint(80, 500),
                "duration": f"{random.randint(1, 3)}h",
                "category": random.choice(["Presentation", "Workshop", "Networking", "Discussion"]),
                "engagement": random.randint(80, 98)
            }
            for i in range(5)
        ]
    }

@app.route("/api/satisfaction", methods=["GET"])
def get_satisfaction_data():
    data = process_satisfaction_data(result)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
