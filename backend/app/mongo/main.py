from pymongo import MongoClient
import datetime

client = MongoClient("mongodb://localhost:27017/")
        
def check(user, passw):
    with client.start_session(causal_consistency=True) as session:
        # Access the collection and attempt to find the account by username
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username": user})
        
        # Debugging: Print the retrieved account data
        print("Retrieved account:", account)

        # Check if the account exists and if the password matches
        if account:
            print("Account found for user:", user)
            print("Stored password:", account["password"])
            print("Provided password:", passw)
            return account["password"] == passw
        
        # If no account was found
        print("No account found with username:", user)
        return False

def make_account(first_name, last_name, dob, user, passw, bio, followers, following):
    with client.start_session(causal_consistency=True) as session:
        collection = client.get_database("local").get_collection("accounts")
        account = collection.find_one({"username":user})
        if account is not None:
            return False
        collection.insert_one({"first_name": first_name, "last_name": last_name, "dob": dob, "username":user, "password":passw, "bio":bio, "followers":followers, "following":following})
        return True

def delete_account(user, passw):
    if not check(user, passw):
        return False
    with client.start_session(causal_consistency=True) as session:
        client.get_database("local").get_collection("accounts").delete_many({"username":user})
    return False

#my tips
def save_tip(user, content):
    with client.start_session(causal_consistency=True) as session:
        # Save the tip in the `tips` collection
        collection = client.get_database("local").get_collection("tips")
        collection.insert_one({
            "username": user,
            "content": content,
            #changed here
            "created_at": datetime.datetime.utcnow()
        })
        print(f"Tip saved for user {user}: {content}")
        return True

def get_tips():
    with client.start_session(causal_consistency=True) as session:
        # Retrieve all tips from the `tips` collection
        collection = client.get_database("local").get_collection("tips")
        tips = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id` field
        print(f"Retrieved tips: {tips}")
        return tips
