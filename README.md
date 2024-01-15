Самая свежый на 15.01.2024 

Модифицированый код - https://github.com/richxcame/cashcodejs

библиотека по работе с купюроприёмниками CashCode

Зависимости serialport и express 

Установка npm i 

или так npm i serialport express

Заводим веб сервер командой - node index

http://localhost:4000/ - для запуска приёма купюр

http://localhost:4000/kill - для остановки приёма купюр

http://localhost:4000/update - для опроса принятых купюр после запуска



ОПИСАНИЕ СТАТУСОВ при дебаге

'10': 'Power UP'

'11': 'Power Up with Bill in Validator'

'12': 'Power Up with Bill in Stacker'

'13': 'Initialize'

'14': 'Idling'

'15': 'Accepting'

'17': 'Stacking'

'18': 'Returning'

'19': 'Unit Disabled'

'1A': 'Holding'

'1B': 'Device Busy'

'1C': 'Rejecting'

'41': 'Drop Cassette Full'

'42': 'Drop Cassette out of position'

'43': 'Validator Jammed'

'44': 'Drop Cassette Jammed'

'45': 'Cheated'

'46': 'Pause'

'47': 'Failed'

'80': 'Escrow position'

'81': 'Bill stacked'

'82': 'Bill returned'
