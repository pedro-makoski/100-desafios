package utils

func InsertInPos[T any](lista []T, pos int, value T) []T {
	listaCopied := CopyList(lista)
	res := []T{}
	res = append(res, listaCopied[:pos]...)
	res = append(res, value)
	res = append(res, lista[pos:]...)
	return res
}
