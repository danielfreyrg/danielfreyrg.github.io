import time

words = open("test.txt").read().split("\n")

def alikeReplacer(word):
    alike = ["k", "t", "d", "p",'b']
    if "y" in word:
        word = word.replace("y", "i")
    for letter in word:
        if letter in alike:
            word = word.replace(letter, "_")
    if 'gg' in word:
        word = word.replace('gg', '__')
    if 'ígja' in word:
        word = word.replace('ígja', 'ía')
    if 'íja' in word:
        word = word.replace('íja','ía')
    if 'ingja' in word:
        word = word.replace('ingja', 'ía')
    if'íe' in word:
        word = word.replace('íe','é')
    
    return word

def printRhymeCategories(wordList, maxVowels=10):
    dict = {1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: []}
    counter = 0
    vowels = ["a", "e", "i", "o", "u", "á", "í", "ó", "ú", "ö", "æ", "é"]
    doubles = ["ey", "au", "ei"]
    wordList.sort(key=lambda x: len(x))
    for word in wordList:
        for double in doubles:
            if double in word:
                counter += 1
        for i in range(len(word)):
            nextletter = ""
            letter = word[i]
            if i < len(word) - 1:
                nextletter = word[i + 1]
            if letter in vowels:
                if letter + nextletter not in doubles:
                    counter += 1

        try:
            dict[counter].append(word)
        except KeyError:
            dict[counter] = [word]
        counter = 0
    for i in range(1, maxVowels + 1):
        if len(dict[i]) > 0:
            string = ", ".join(dict[i])
            print(f"    {i} atkvæði: {string}")
            print(f"\n fjöldi: {len(dict[i])}")
            print("\n " + "-" * 90)


def findStartRhymes(word):
    rhymes = []
    wordLength = len(word)
    for i in words:
        if word in i[0:wordLength]:
            rhymes.append(i)
    return rhymes


def findImperfectRhyme(rhyme):
    rhymes = []
    rhyme = alikeReplacer(rhyme)
    for word in words:
        realWord = word
        word = alikeReplacer(word)
        for i in range(0, len(word)-2):
            for j in range(0,len(rhyme)-2):
                if rhyme[j:] == word[i:] and realWord not in rhymes:
                    rhymes.append(realWord)
    return rhymes


def findEndRhymes(word, perfect=False, numToMatch=-3):
    rhymes = []
    different = ['nn','ll','ei','ey','au','ss']
    if not perfect:
        word = alikeReplacer(word)
        oldindex = numToMatch
        if len(word) <= 4:
            numToMatch = -2
            oldindex = numToMatch
        elif len(word) <=2:
            numToMatch = 0
    else:
        oldindex = -len(word) + 1
    while word[oldindex] == '_' or word[oldindex] == 'l':
        try:
            oldindex -=1
        except IndexError:
            print('dem')
    for i in words:
        index = oldindex
        add = True
        oldWord = i
        if i[0] == "-":
            continue
        if not perfect:
            i = alikeReplacer(i)

        b = word[index:]
        a = i[index:]
        if (word[index:] == i[index:] and word[-1] == i[-1]):
            if word != oldWord:
                for double in different:
                    if double in oldWord:
                        if double in word and oldWord not in rhymes:
                            add = True
                        else:
                            add = False
        else:
            add = False
        if add:
            rhymes.append(oldWord)

    return rhymes


now = time.time()


rhyme = "högg"
# y = findEndRhymes(rhyme, False)
# printRhymeCategories(y)
# print(len(y))
# print("-" * 99)



x = findImperfectRhyme(rhyme)
printRhymeCategories(x)
then = time.time()
print(then - now)

# for i in words:
#     oldword = i
#     i = alikeReplacer(i)
#     if len(rhyme) > 3:
#         index = -3
#     else:
#         index = -2
#     if i[index:] == rhyme[index:]:
#         w.append(oldword)
# printRhymeCategories(w)

# print('hús'[-2:])
# x = alikeReplacer('kuttingja')
# print(x)