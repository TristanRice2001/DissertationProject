import inspect
from flask import request
from functools import wraps
from multidict import MultiDict
from app.exceptions import ValidationError
from app.responses import error_response
from app.messages import general_messages

def validator(validators=[], raise_error_if_missing=True, expected_args=[]):
    def wrapper_outer(f):
        @wraps(f)
        def decorator(*args, **kwargs):
            make_dict_items = lambda x: list(dict(x).items())
            print("Kwargs: ", kwargs)
            print("Args: ", args)
            m = MultiDict([                
                *make_dict_items(request.form),
                *make_dict_items(request.args),
                *make_dict_items(kwargs),
                *make_dict_items(request.get_json() if request.is_json else {})
            ])

            for arg in expected_args:
                if arg not in m: 
                    if raise_error_if_missing:
                        return error_response(general_messages["argument_missing"](arg))
                    m[arg] = None

            print("here")
            kwargs_to_pass = {}
            for arg_name in expected_args:
                all_args = m.getall(arg_name)
                kwargs_to_pass[arg_name] = all_args if len(all_args) > 1 else all_args[0]
            for validator_func in validators:
                validator_func_arguments = inspect.getfullargspec(validator_func).args
                kwargs_for_validator = {
                    k:v for k,v in kwargs_to_pass.items() if k in validator_func_arguments
                }
                try:
                    validator_func(**kwargs_for_validator)
                except ValidationError as e:
                    return error_response(message=str(e))

            return f(*args, **{**kwargs_to_pass, **kwargs})

        return decorator
    return wrapper_outer
                