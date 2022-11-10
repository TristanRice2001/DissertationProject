from flask import jsonify

def generic_response(message, is_successfull, **kwargs):
    response = {
        "success": is_successfull,
        "message": message
    }

    return jsonify({**response, **kwargs})
