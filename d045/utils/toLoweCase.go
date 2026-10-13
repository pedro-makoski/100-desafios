package utils

import "strings"

func FirstLettertoLowerCase(text string) string {
	textByted := []byte(text)
	if len(textByted) < 1 {
		return text
	}
	textByted[0] = byte(strings.ToLower(string(textByted[0]))[0])
	return string(textByted)
}
