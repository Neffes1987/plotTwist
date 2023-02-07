import { Dictionary } from './interface';

export const Translation: Dictionary = {
  ru: {
    translation: {
      messages: {
        success: 'Успех!',
        minimalRequiredValue: 'Минимальное количество символов: {{quantity}}',
        emptyList: 'Список пуст, давайте создадим первый элемент?',
      },
      actions: {
        next: 'Далее',
      },
      errors: {
        oops: 'Что-то пошло не так...',
        quantity: 'Количество ошибок на форме: {{quantity}}',
        RANGE: 'Поле должно быть длинее {{min}}, но короче {{max}} символов.',
        REQUIRED: 'Это поле является обязательным!',
        ENTITY_DUPLICATION: 'Запись с {{entityId}} уже существует',
        worldInDraft: 'Текущий модуль не готов, пожулуйста заполните все поля',
      },
      pages: {
        worldEditor: {
          caption: 'Редактор мира',
          actions: {
            create: 'Создать новый мир',
            update: 'Обновить данные о мире',
          },
          labels: {
            introduction: 'Как вы познакомите игроков с этим миром?',
            worldProblems: 'Какие окружающие персонажей проблемы или события заставят их отправятся в путешествие?',
            charactersProblems: 'Какие проблемы заставят персонажей покинуть зону комфорта?',
            contrast: 'Чем этот мир отличается от обычного мира персонажей?',
            shadowIntroduction: 'Как проявит себя тень? Что игрокам известно о нем?',
            mainEdge: 'Кульминационное испытание в сюжете, какое оно?',
            holidayType: 'Укажите тип торжества',
            holidaySubType: 'Укажите подтип торжества',
            chase: 'Укажите, кто может заставить игровок вернуться в обыденный мир?',
            shadowRevenge: 'Как главный злодей может отомстить за свое поражение?',
            journeyResult: 'Какой жизненный опыт получат игроки завершив этот сюжет?',
            rewards: 'Какие финалы ждут каждого персонажа партии и NPC?',
            endType: 'Укажите тип финала путешествия?',
            endDescription: 'Что случится в конце путеществия?',
            cliffhanger: 'Какой будет открытый конец у путеществия?',
            reference: 'На какое произведение похоже?',
            history: 'Какая у этого мира история?',
            timeline: 'Временной отрывок',
            price: 'Что случится, если игроки не пройдут основное испытание?',
            edge: 'Укажите основное испытание этого мира?',
            waterholes: 'Где игроки могут добыть информацию?',
            laws: 'Какие законы у этого мира?',
            name: 'Как называется место в котором оказались игроки?',
            description: 'Как его можно описать?',
            partyPlan: 'Какой оптимальный план помог бы игрокам решить проблему?',
          },
          lists: {
            journeyResult: {
              wisdom: 'Мудрость - как награда',
              love: 'Любовь - как награда',
              responsible: 'Обретение ответственности',
              tragedy: 'Усиление трагедии',
              badExperience: 'Неудачный опыт',
              wastedTime: 'Неудачное путешествие - потеря времени',
            },
            finalType: {
              cycle: 'Возврат в начало',
              achievePerfect: 'Путешествие завершено',
              openEnd: 'Открытый конец',
            },
          },
        },
        home: {
          caption: 'Сюжет: #{{name}}',
          messages: {
            greetingMessage: 'Начните заполнение сюжета с создания обыденного мира',
          },
          errors: {
            cantGetWorlds: 'Не могу загрузить данные по сюжету',
          },
          labels: {},
          actions: {
            createFirstWorld: 'Добавить обыденный мир',
            createNextWorld: 'Добавить слудующий мир',
          },
        },
        waterholesList: {
          caption: 'Список водопоев',
          messages: {
            wasCreated: 'Водопой успешно создан!',
            emptyList: 'Список водопоев пуст, давайте создадим новый?',
          },
          actions: {
            addNew: 'Добавить новый водопой',
            update: 'Изменить водопой',
            delete: 'Удалить',
            assign: 'Привязать к миру',
            unAssign: 'Отвязать от мира',
          },
          labels: {
            name: 'Название водопоя',
            description: 'Описание водопоя',
          },
        },
        charactersList: {
          caption: 'Список ',
          messages: {
            wasCreated: 'Персонаж успешно создан!',
            emptyList: 'Список Персонажей пуст, давайте создадим новый?',
          },
          actions: {
            addNew: 'Добавить нового персонажа',
            update: 'Изменить персонажа',
            delete: 'Удалить',
            assign: 'Привязать к миру',
            unAssign: 'Отвязать от мира',
          },
          labels: {
            age: 'Возраст',
            gender: 'Пол',
            goal: 'Цель в сюжете',
            group: 'Фракция',
            name: 'Имя персонажа',
            profession: 'Профессия',
            race: 'Раса',
            type: 'Тип персонажа',
          },
        },
        lawsList: {
          caption: 'Список законов',
          messages: {
            wasCreated: 'Закон успешно создан!',
            emptyList: 'Список законов пуст, давайте создадим новый?',
          },
          actions: {
            addNew: 'Добавить новый закон',
            update: 'Изменить закон',
            delete: 'Удалить',
            assign: 'Привязать к миру',
            unAssign: 'Отвязать от мира',
          },
          labels: {
            name: 'Название закона',
            description: 'Описание закона',
            punishment: 'Что будет если его нарушить?',
          },
        },
        rewardsList: {
          caption: 'Список наград',
          messages: {
            wasCreated: 'Награда успешно создан!',
            emptyList: 'Список наград пуст, давайте создадим новый?',
          },
          actions: {
            addNew: 'Добавить новую награду',
            update: 'Изменить награду',
            delete: 'Удалить',
            assign: 'Привязать к испытанию',
            unAssign: 'Отвязать от испытания',
          },
          labels: {
            name: 'Название награды',
            description: 'Описание награды',
          },
        },
        plotList: {
          caption: 'Список сюжетов',
          messages: {
            wasCreated: 'Сюжет успешно создан!',
            emptyList: 'Список сюжетов пуст, давайте создадим новый?',
          },
          actions: {
            addNew: 'Создать новый сюжет',
            update: 'Обновить сюжет',
            delete: 'Удалить сюжет',
            open: 'Открыть сюжет',
          },
          errors: {},
          labels: {
            name: 'Имя сюжета',
            description: 'Описание сюжета',
          },
        },
        edgeEditor: {
          caption: 'Преграда',
          actions: {
            create: 'Создать преграду',
            update: 'Обновить преграду',
          },
          labels: {
            mainEdgeType: 'Тип главного испытания',
            shadowEncounterType: 'Тип схватки с тенью',
            name: 'Название испытания',
            description: 'Подробности',
            type: 'Тип испытания',
            edgeImpact: 'Какая цель у испытания?',
          },
          lists: {
            edgeTypeOptions: {
              plain: 'Обычное испытание',
              main: 'Главное испытание',
            },
            shadowEncounterType: {
              Demonization: 'Демонизация тени',
              DeathOfVillain: 'Смерть злодея',
              VillainGetaway: 'Побег злодея',
              ShadowHeroOfHisStory: 'Тень - как герой своей истории',
            },
            mainEdgeTypeOptions: {
              MeetingWithMainFear: 'Встреча с главным страхом',
              AsDeathWitness: 'Свидетель преступления',
              CauseOfDeath: 'Причина смерти',
              Equilibrium: 'Равновесие',
              FatherConfrontation: 'Дальнее противостояние',
              ImaginaryHeroDeath: 'Мнимая смерть героя',
              LoveThatKills: 'Любовь которая убивает',
              SacredMarriage: 'Жертва во имя любви',
              ThroughEyesOfPsychopath: 'Сквозь взгляд психопата',
              YouthVersusOldAge: 'Молодость против старости',
              ShadowEncounter: 'Встреча с тенью',
            },
          },
        },
      },
      widget: {
        worldWidgetNPC: {
          caption: 'Персонажи',
          labels: {
            ally: 'Союзники',
            enemy: 'Враги',
            guard: 'Стражи',
            messenger: 'Вестники',
            mentor: 'Наставники',
            shadow: 'Главный злодей',
          },
        },
        worldWidgetInfo: {
          caption: 'О мире',
          labels: {
            brokenLaws: 'Нарушено законов',
            activeCalls: 'Активных посланий',
            waterholes: 'Водопои',
            aboutWorld: 'Подробнее',
          },
          lists: {
            captions: {
              plainWorld: 'Обыденный мир',
              privateWorld: 'Тайный мир',
              hiddenCaveWorld: 'Скрытая пещера',
              holidayWorld: 'Торжество',
              returnWithPotionWorld: 'Возвращение с элексиром',
            },
            faq: {
              plainWorld: 'Об обыденном мире...',
              privateWorld: 'О тайном мире...',
              hiddenCaveWorld: 'О скрытой пещере...',
              holidayWorld: 'О торжестве...',
              returnWithPotionWorld: 'О возвращении с элексиром...',
            },
          },
        },
        worldWidgetEdge: {
          caption: 'О пороге',
          labels: {
            aboutEdge: 'Подробнее',
            rewards: 'Награды за задания',
            activeChallenges: 'Всего заданий',
            passedChallenges: 'Пройденные задания',
            failedChallenges: 'Проваленные задания',
          },
        },
      },
    },
  },
};
