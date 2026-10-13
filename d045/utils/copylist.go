package utils

func CopyList[T any](list []T) []T {
	newList := []T{}
	for _, v := range list {
		newList = append(newList, v)
	}

	return newList
}
