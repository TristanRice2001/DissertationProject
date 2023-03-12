import re
import docker
from docker_service import DockerService
from exceptions import  ContainerDoesntExistError

def error(message, **kwargs):
    return {
        "message": message,
        "success": False,
        **kwargs
    }

def success(message, **kwargs):
    return {
        "message": message,
        "success": True,
        **kwargs
    }

def run_image(id):
    docker_service = DockerService()
    try:
        container_info = docker_service.run_container(id)
    except ContainerDoesntExistError as e:
        return error(message=str(e))
    
    if not container_info:
        return error(message="Failed to start container")
    
    return success(message="Container started", ip=container_info[0], container_id=container_info[1])

def terminate_container(container_id):
    docker_service = DockerService()
    docker_service.stop_and_remove_container(container_id)
    return success(message="Successfully terminated")

    
# class StartCommand(Command):
#     def __init__(self, *command_args):
#         super().__init__(*command_args)
#         self.image_internal_id = command_args[0]
    
#     def run(self):
#         try:
#             container_info = self.docker_service.run_container(self.image_internal_id)
#         except ContainerDoesntExistError as e:
#             return self._format_command_result(is_successful=False, response_args=[str(e)])
        
#         if not container_info:
#             return self._format_command_result(is_successful=False, response_args=["Failed to start conatiner"])
        
#         return self._format_command_result(is_successful=True, response_args=container_info)
    
#     def __repr__(self):
#         return f"<Docker run command on container {self.image_internal_id}>"

# class StopCommand(Command):
#     def __init__(self, *command_args):
#         super().__init__(*command_args)
#         self.running_container_id = command_args[0]
    
#     def run(self):
#         self.docker_service.stop_and_remove_container(self.running_container_id)
#         return self._format_command_result(is_successful=True)

# class ResetCommand(Command):
#     def __init__(self, *command_args):
#         super().__init__(*command_args)
#         self.running_container_id = command_args[0]

#     def run(self):
#         try:
#             self.docker_service.stop_and_remove_container(self.running_container_id)
#         except docker.errors.NotFound:
#             return self._format_command_result(is_successful=False, response_args=["Container not found"])
    
#         return self._format_command_result(is_successful=True)