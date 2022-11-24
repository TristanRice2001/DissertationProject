from flask import jsonify
from functools import partial

def generic_response(message, is_successfull, **kwargs):
    response = {
        "success": is_successfull,
        "message": message
    }

    return jsonify({**response, **kwargs})

error_response = partial(generic_response, is_successfull=False)
success_response = partial(generic_response, is_successfull=True)