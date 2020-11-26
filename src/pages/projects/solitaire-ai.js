import React, { useState, createContext } from "react";
import styles from '../../styles/article.module.css'
import Coder from "../../components/code"


const CodeContext = createContext({
  setContext : () => {},
})

function Article(props) {
  const [index, setIndex] = useState(0);
  const [code, setCode] = useState('console.log("Article");');
  const [lang, setLang] = useState('language-js');

  function decrementIndex() {
    setIndex(Math.max(0, index - 1));
  }

  function incrementIndex() {
    setIndex(Math.min(index + 1, props.pages.length - 1))
  }

  return (
    <div className={styles.article}>
      <div className={styles.content}>
        {props.pages[index]}
        <button onClick={decrementIndex}> Back </button>
        <button onClick={incrementIndex}> Next </button>
      </div>
      <div className={styles.sidebar}>
        <Coder language={lang} code={code} />
      </div>
    </div>
  );
}

function Page(props) {
  return (
    <div>
      <h2 className={styles.title}> {props.title} </h2>
      {props.children}
    </div>
  )
}

function Paragraph(props) {

  function handleClick() {
    console.log('Paragraph clicked');
  }

  return (
    <p className={styles.paragraph} onClick={handleClick}>
      {props.children}
    </p>
  )
}


function SolitaireAI() {
  const pages = [
    (<Page title={'Solitaire AI'}>
        <Paragraph code={{
          lang : 'language-js',
          text : 'console.log("First paragraph");'
        }}>
          There have been a few approaches to solving klondike solitaire in the
          past. They usually assume that the values of hidden cards are known to
          the player, a form known as thoughtful solitaire. Any game that is
          solvable in thoughtful solitaire is also solvable in regular solitaire.
          As as result, research in this area has shown that the solvability of
          solitaire lies between ~82% and ~91% <cite>(Bjarnason et al.)</cite>
        </Paragraph>
        <Paragraph code={{
          lang : 'language-js',
          text : 'console.log("Second paragraph");'
        }}>
          While these bounds are interesting, they rely on the assumption of
          perfect information (i.e. every card is known). In reality, solitaire
          is played under uncertainty; you have to consider every permutation of
          hidden cards and act accordingly. Even with a single deal of solitaire,
          there are 21! permutations of hidden cards; far too many for a human or
          computer to calculate.
        </Paragraph>
        <Paragraph code={{
          lang : 'language-js',
          text : 'console.log("Third paragraph");'
        }}>
          Deep reinforcement learning solves this problem by training a deep
          neural network to approximate the value of arbitrary states or actions.
          Using these networks, we can derive a strategy that generalizes to
          states that likely have never seen before. Before we get to that point,
          we have to create an environment that defines the observations, actions,
          and rewards in solitaire.
        </Paragraph>
    </Page>),
    (<Page title={'Support Classes'}>
        <Paragraph>
          Solitaire fundamentally boils down to piles of cards and rules for moving
          cards between them. So before we get started on the environment, we'll
          implement some classes that will encapsulate the objects we'll be operating
          on. While not all environments take the OOP approach, in this case it
          certainly made it easier to reason about and debug.
        </Paragraph>
        <h3 className={styles.title}> Cards </h3>
        <Paragraph code={{
          lang : 'language-cpp',
          text : `enum class SuitType {
  kNone = 0,
  kSpades,
  kHearts,
  kClubs,
  kDiamonds,
  kHidden,
};

enum class RankType {
  kNone = 0,
  kA,
  k2,
  k3,
  k4,
  k5,
  k6,
  k7,
  k8,
  k9,
  kT,
  kJ,
  kQ,
  kK,
  kHidden,
};`
        }}>
          Cards are essentially defined by their rank, suit, and whether they are
          hidden or not. Ranks and suits are members of an enumeration class,
          RankType and SuitType respectively. Both include kHidden and kNone as members,
          with the former being used as a placeholder for cards that haven't been
          revealed yet. The latter is used to represent empty foundation or tableau piles.
        </Paragraph>
        <Paragraph code={{
          lang : 'language-cpp',
          text : 'std::cout << "Second paragraph" << std::endl;'
        }}>
          It's also helpful to represent cards as integers, which can be calculated
          from their rank and suit. Since these are set once they are revealed, it
          makes sense to calculate them only once and then store them in a private
          field: hidden_. If a card has been revealed, the first call to Card::GetIndex()
          will calculate and store it; otherwise, the stored value will be returned.
        </Paragraph>
        <Paragraph code={{
          lang : 'language-cpp',
          text : 'std::cout << "Third paragraph" << std::endl;'
        }}>
          While the location of a card should technically belong to the state,
          rather than the card itself, in this instance it's helpful to keep it
          within this class. If it were moved to the state, we would need to lookup
          the location whenever we wanted to call the Card::LegalChildren()
          method.
        </Paragraph>
    </Page>)
  ]
  return <Article title={'Solitaire AI'} pages={pages} />
}

export default SolitaireAI;
