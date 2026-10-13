package utils

func DoExistsThisField[K comparable, V any](data map[K]V, field K) bool {
	_, ok := data[field]
	return ok
}
