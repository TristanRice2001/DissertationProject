#include <stdio.h>

int main(int argc, char **argv) {
	char buffer[256];
	char hidden_flag[] = "<REDACTED>";
	printf("Hidden flag is at %p\n", &hidden_flag);
	gets(buffer);
	printf(buffer);
	printf("\n");

	return 0;
}
