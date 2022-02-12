import pandas as pd

df = pd.read_excel(r'dico.xlsx', sheet_name=0)
ranflish_list = df['Ranflish'].tolist()
francais_list = df['Français'].tolist()
english_list = df['Anglois'].tolist()
flemish_list = df['Flemish'].tolist()
definition_list = df['Definition (optional)'].tolist()

words = []
for i in range(len(ranflish_list)): words.append([ranflish_list[i],francais_list[i],english_list[i],flemish_list[i],definition_list[i]])

placed = False
sorted_words = [["A"]]
for i in range(len(words)):
    for j in range(len(sorted_words)):
        if words[i][0] <= sorted_words[j][0]:
            sorted_words.insert(j, words[i])
            placed = True
            break
    if not placed: sorted_words.append(words[i])
    else: placed = False

alphabet = [['B'], ['C'], ['D'], ['E'], ['F'], ['G'], ['H'], ['I'], ['J'], ['K'], ['L'], ['M'], ['N'], ['O'], ['P'], ['Q'], ['R'], ['S'], ['T'], ['U'], ['V'], ['W'], ['X'], ['Y'], ['Z']]
for i in range(len(alphabet)):
    for j in range(len(sorted_words)):
        if alphabet[i][0] <= sorted_words[j][0]:
            sorted_words.insert(j, alphabet[i])
            placed = True
            break
    if not placed: sorted_words.append(alphabet[i])
    else: placed = False

print(sorted_words)

dico = []
for word in sorted_words:
    try:
        dico.append(f'''<table class="reference"><tr>
            <td><p class="word">{"<br>".join(word[0].splitlines())}</p></td>
            <td><p class="word">{"<br>".join(word[1].splitlines())}</p></td>
            <td><p class="word">{"<br>".join(word[2].splitlines())}</p></td>
            <td><p class="word">{"<br>".join(word[3].splitlines())}</p></td>
            <td><p class="word">{"<br>".join(word[4].splitlines())}</p></td>
        </tr></table>''')
    except: dico.append(f'''<span id={word[0]}><p class="letter">{word[0]}</p></span>''')

THE_list = "\n".join(dico)

with open("base.html","r") as f: doc = f.read()
doc = doc.replace("<!--DICTIONARY-->",THE_list)
with open("rewrite.html","w") as f: f.write(doc)