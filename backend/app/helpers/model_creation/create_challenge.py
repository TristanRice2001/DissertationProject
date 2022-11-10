from app.models import Challenge, ChallengeHint

def create_challenge(db, name, points, hints, *args, **kwargs):
    c = Challenge(name=name, points=points, *args, **kwargs)
    for hint in hints:
        all_hints = [ChallengeHint(hint=hint, challenge=c)]

    db.session.add(c)
    db.session.commit()