package utils

const PARENTESES_START_POS int = 2
const PARENTESES_END_POS int = 4
const LENGTH_NEW_TEL int = 13
const MIDDLE_TELEFONE_NEW int = 9
const MIDDLE_TELEFONE_OLD int = 8
const PLUS_POS int = 0

func isNewLengthOfTel(telefone string) bool {
	return len(telefone) == LENGTH_NEW_TEL
}

func getPosToInsertSeparatorTel(telefone string) int {
	if isNewLengthOfTel(telefone) {
		return MIDDLE_TELEFONE_NEW
	}

	return MIDDLE_TELEFONE_OLD
}

func FormatTelefoneOnString(telNoFormated string) string {
	posToMiddle := getPosToInsertSeparatorTel(telNoFormated)

	return InsertInPosesElements(telNoFormated, []int{PLUS_POS, PARENTESES_START_POS, PARENTESES_END_POS, posToMiddle},
		[]string{"+", " (", ") ", "-"})
}
