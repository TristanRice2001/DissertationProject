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
