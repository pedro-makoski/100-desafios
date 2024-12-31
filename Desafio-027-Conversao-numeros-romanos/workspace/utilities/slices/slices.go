package listSlices

func InverseListInt(list []int) []int {
	var newList []int
	for i:=len(list)-1; i > 0; i-- {
		newList = append(newList, list[i])
	}

	return newList
}
func StrigSliceContains(slice []string, procurado string) bool {
	for i := 0; i < len(slice); i++ {
		if slice[i] == procurado {
			return true
		}
	}

	return false
}

func FindIndex(text []string, value string) int {
	for i := 0; i < len(text); i++ {
		if string(text[i]) == value {
			return i
		}
	}

	return -1
}

func AppendOrdentate(list1 []int, list2 []int, list1String []string, list2String []string, funcao func(n1 int, n2 int) int, list3 []int, list4 []int, originOriginal []int, originNew []int) ([]string, []int, []int, []int){
	var numbers []int = list1
	numbers = append(numbers, list2...)
	var strings []string = list1String
	strings = append(strings, list2String...)
	var repeats []int = list3
	repeats = append(repeats, list4...)
	var origin []int = originOriginal
	origin = append(origin, originNew...)

	for i := 0; i < len(numbers); i++ {
		for j := i+1; j < len(numbers); j++ {
			if(funcao(numbers[i], numbers[j]) > 0) {
				aux := numbers[i]
				numbers[i] = numbers[j] 
				numbers[j] = aux
				auxString := strings[i]
				strings[i]=strings[j]
				strings[j]=auxString
				auxRepeat := repeats[i]
				repeats[i]=repeats[j]
				repeats[j]=auxRepeat
				auxOrigin := origin[i]
				origin[i] = origin[j]
				origin[j]=auxOrigin
			}
		}
	}

	return strings, numbers, repeats, origin
}

func OrdenateInverse(n1 int, n2 int) int{
	return n2-n1
}