package utils

func StringInSlice(check string, list []string) (found bool) {
	for _, item := range list {
		if check == item {
			return true
		}
	}

	return false
}