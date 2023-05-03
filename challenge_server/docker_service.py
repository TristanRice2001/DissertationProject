import docker


class ContainerDoesntExistError(Exception):
    pass

class DockerService:
    def __init__(self):
        self.images = {
            "1": "cooky-command-injection",
            "4": "super-sql-injection",
            "5": "lazy-local-file-inclusion",
            "6": "xenial-xml-entities",
            "7": "tactical-time-based-sql-injection",
            "8": "sardonic-sql-injection"
        }
        self.network_name = "tun0"
        self.client = docker.DockerClient("unix:///var/run/docker.sock")
    
    def run_container(self, image_id):
        if image_id not in self.images.keys():
            raise ContainerDoesntExistError("Container doesn't exist")
    
        container = self.client.containers.run(self.images[image_id], network="tun0", detach=True)
        
        network = self.client.networks.get(self.network_name)

        for network_container in network.containers:
            if network_container == container:
                container_ip = network_container.attrs["NetworkSettings"]["Networks"][self.network_name]["IPAddress"]
                container_id = network_container.id
                return (container_ip, container_id)
        
        return None
    
    def stop_and_remove_container(self, container_id):
        try:
            container = self.client.containers.get(container_id)
        except docker.errors.NotFound:
            # If the container is not found, just continue the program anyway
            return

        container.stop()
        container.remove()

    def restart_container(self, container_id):
        try:
            container = self.client.containers.get(container_id)
        except docker.errors.NotFound:
            return
        container.restart()

if __name__ == "__main__":
    d = DockerService()
    print(d.run_container("1"))
