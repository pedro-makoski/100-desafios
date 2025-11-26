package utils

func FilterList[T any](list []T, conditionFunc func(el T) bool) []T {
	newList := []T{}

	for _, v := range list {
		if conditionFunc(v) {
			newList = append(newList, v)
		}
	}

	return newList
}
