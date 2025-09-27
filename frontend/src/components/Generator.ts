import type { TextOptions } from "../models/TextOptions";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

const WORDS = LOREM.split(" ");

export class Generator {


  private options: TextOptions;
  private result: string = '';

  constructor(options: TextOptions) {
    this.options = options;
  }

  /**
   * Utility: generate random words from the lorem dictionary.
   */
  private randomWords(count: number): string {
    return Array.from({ length: count }, () =>
      WORDS[Math.floor(Math.random() * WORDS.length)]
    ).join(" ");
  }

  /**
   * Generate plain words
   */
  private generateWords(): string {
    return this.randomWords(this.options.textCount);
  }

  /**
   * Generate paragraphs
   */
  private generateParagraphs(): string {
    return Array.from({ length: this.options.textCount }, () =>
      this.randomWords(Math.floor(Math.random() * 20 + 40)) // ~40–60 words
    )
      .map(paragraph => `<p>${paragraph}</p> <br>`)
      .join("");
  }

  /**
   * Generate letters
   */
  private generateLetters(): string {
    return LOREM.repeat(Math.ceil(this.options.textCount / LOREM.length)).slice(
      0,
      this.options.textCount
    );
  }


  private generateText(): string {
    const {
      textChecked,
      textType,
      textCount,
    } = this.options;

    if ((!textChecked || textCount <= 0)) {
      return "";
    }

    switch (textType) {
      case "words":
        return this.generateWords();
      case "paragraph":
        return this.generateParagraphs();
      case "letters":
        return this.generateLetters();
      default:
        return "";
    }
  }
  private generateList(): string {
    const
      {
        listChecked,
        orderedListChecked,
        unOrderedListChecked,
        orderedListCount,
        unOrderedListCount
      } = this.options

    let listOutput = ''

    if (!listChecked || (!orderedListChecked && !unOrderedListChecked)) return ''


    if (orderedListChecked && orderedListCount > 0) {
      let olList = ""
      for (let index = 0; index < orderedListCount; index++) {
        const wordCount = Math.floor(Math.random() * 8 + 3)
        const sentence = this.randomWords(wordCount)
        const ol = `<li>${sentence}</li>`
        olList = olList + ol
      }
      olList = `<ol>${olList}</ol>`
      listOutput += olList
    }
    if (unOrderedListChecked && unOrderedListCount > 0) {
      let ulList = ""
      for (let index = 0; index < unOrderedListCount; index++) {
        const wordCount = Math.floor(Math.random() * 8 + 3)
        const sentence = this.randomWords(wordCount)
        const ul = `<li>${sentence}</li>`
        ulList = ulList + ul
      }
      ulList = `<ul>${ulList}</ul>`
      listOutput = listOutput ? listOutput + "<br>" + ulList : ulList
    }

    return listOutput
  }

  public generate() {
    const text = this.generateText()
    const list = this.generateList()
    this.result = text + "<br>" + list
    return this.result;
  }
}
