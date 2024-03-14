#get request to this address: https://api.dominos.is/api/menu
#returns the menu in json format
import requests
items = [ 'Spínat', 'Rjómaostur', 'Græn paprika', 'Pulled pork', 'Pepperoni', 'Sveppir', "Skinka", "Piparostur", "Svartar ólífur", "Ananas", "hakk", "Vegan kjúklingur", 'Fajitas kjúklingur', 'Rauðlaukur', 'Beikonkurl', 'Ferskur chili', 'Jalapeno', 'Döðlur']
items = [i.lower() for i in items]
def get_menu():
    url = "https://api.dominos.is/api/menu"
    response = requests.get(url)
    return response.json()
x = get_menu()
lis = []
for i in x['menu']['allToppings']:
    if i['name'].lower() in items:
        print('"'+i['name'] + '":' + i['id'] + ',' + str(i['isHidden']))
