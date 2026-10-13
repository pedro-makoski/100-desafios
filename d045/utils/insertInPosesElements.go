package utils

func InsertInPosesElements(text string, textPoses []int, textValues []string) string {
	acumulative := int(0)
	res := Split(text, "")

	for i, pos := range textPoses {
		value := textValues[i]
		res = InsertInPos(res, pos+acumulative, value)
		acumulative += 1
	}

	return Join(res, "")
}
